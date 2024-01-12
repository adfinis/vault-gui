#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::collections::HashMap;
use vaultrs::client::{VaultClient, VaultClientSettingsBuilder};
use vaultrs::{kv2, sys};

fn vault_login(address: String, token: String) -> VaultClient {
    let settings = VaultClientSettingsBuilder::default()
        .address(&address)
        .token(&token)
        .build();
    let client = match settings {
        Ok(settings) => settings,
        Err(e) => {
            panic!("Error creating settings: {}", e);
        }
    };

    let client = VaultClient::new(client);
    match client {
        Ok(client) => {
            return client;
        }
        Err(e) => {
            panic!("Error creating client: {}", e);
        }
    }
}

#[tauri::command]
async fn list_kvs(address: String, token: String) -> Vec<String> {
    let client = vault_login(address, token);
    let result = sys::mount::list(&client).await;
    match result {
        Ok(list) => {
            // Only return the string parts of the HashMap
            return list.keys().cloned().collect();
        }
        Err(e) => {
            panic!("Error listing keys: {}", e);
        }
    }
}

#[tauri::command]
async fn list_path(address: String, token: String, mount: String, path: String) -> Vec<String> {
    let client = vault_login(address, token);
    let result = kv2::list(&client, &mount, &path).await;
    match result {
        Ok(list) => {
            return list;
        }
        Err(e) => {
            panic!("Error listing keys: {}", e);
        }
    }
}

#[tauri::command]
async fn get_secret(address: String, token: String, mount: String, path: String) -> HashMap<String, String> {
    let client = vault_login(address, token);
    let result = kv2::read(&client, &mount, &path).await;
    match result {
        Ok(secret) => {
            return secret;
        }
        Err(e) => {
            panic!("Error reading secret: {}", e);
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_kvs,
            list_path,
            get_secret
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
