#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use lazy_static::lazy_static;
use std::collections::HashMap;
use std::sync::Arc;
use tauri::api::shell;
use tauri::{AppHandle, Manager};
use tokio::sync::Mutex;
use vaultrs::client::{VaultClient, VaultClientSettingsBuilder};
use vaultrs::{kv2, sys};
use vaultrs_login::engines::oidc::OIDCLogin;
use vaultrs_login::LoginClient;

lazy_static! {
    static ref GLOBAL_VAULT_CLIENT: Arc<Mutex<Option<VaultClient>>> = Arc::new(Mutex::new(None));
}

#[tauri::command]
async fn oidc_auth(
    app_handle: AppHandle,
    address: String,
    mount: String,
) -> Result<String, String> {
    let settings_builder = VaultClientSettingsBuilder::default()
        .address(&address)
        .build();
    let settings = match settings_builder {
        Ok(settings) => settings,
        Err(e) => return Err(format!("Error creating settings: {}", e)),
    };

    let mut client = match VaultClient::new(settings) {
        Ok(client) => client,
        Err(e) => return Err(format!("Error creating VaultClient: {}", e)),
    };

    let login = OIDCLogin {
        port: None,
        role: None,
    };

    let callback = client.login_multi(&mount, login).await;
    let callback = match callback {
        Ok(callback) => callback,
        Err(e) => return Err(format!("Error logging in: {}", e)),
    };
    let callback_url = callback.url.clone();
    shell::open(&app_handle.shell_scope(), &callback_url, None).unwrap();
    println!("{}", callback_url);
    let callback_res = client.login_multi_callback(&mount, callback).await;
    match callback_res {
        Ok(_) => {}
        Err(e) => return Err(format!("Error logging in: {}", e)),
    };

    let mut global_client = GLOBAL_VAULT_CLIENT.lock().await;
    *global_client = Some(client);

    Ok("OK".to_string())
}

#[tauri::command]
async fn list_kvs() -> Result<Vec<String>, String> {
    let guard = GLOBAL_VAULT_CLIENT.lock().await;
    println!("hi");
    let client = guard
        .as_ref()
        .ok_or_else(|| "VaultClient is not initialized".to_string())?;

    let result = sys::mount::list(client).await;
    match result {
        Ok(list) => {
            // Only return the string parts of the HashMap
            Ok(list.keys().cloned().collect())
        }
        Err(e) => Err(format!("Error listing keys: {}", e)),
    }
}

#[tauri::command]
async fn list_path(mount: String, path: String) -> Result<Vec<String>, String> {
    let guard = GLOBAL_VAULT_CLIENT.lock().await;
    let client = guard
        .as_ref()
        .ok_or_else(|| "VaultClient is not initialized".to_string())?;
    let result = kv2::list(client, &mount, &path).await;
    println!("mount={}, path={}", &mount, &path);
    match result {
        Ok(list) => Ok(list),
        Err(e) => Err(format!("Error listing keys: {}", e)),
    }
}

#[tauri::command]
async fn get_secret(mount: String, path: String) -> Result<HashMap<String, String>, String> {
    let guard = GLOBAL_VAULT_CLIENT.lock().await;
    let client = guard
        .as_ref()
        .ok_or_else(|| "VaultClient is not initialized".to_string())?;
    let result = kv2::read(client, &mount, &path).await;
    match result {
        Ok(secret) => Ok(secret),
        Err(e) => Err(format!("Error reading secret: {}", e)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            oidc_auth, list_kvs, list_path, get_secret
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
