import { invoke } from '@tauri-apps/api/tauri';
import { onMount, type Component } from 'solid-js';
import toast from 'solid-toast';
import { setState } from './state';
import { useNavigate } from '@solidjs/router';

const Login: Component = () => {
    const navigate = useNavigate();
    const oidcAuth = async (): Promise<void> => {
        try {
            console.log(
                await invoke('oidc_auth', { address: oidcURL(), mount: 'oidc' }),
            );
            setState('authenticated', true);
            navigate('/home', { replace: true });
        } catch (e) {
            toast.error(e);
        }
    };

    onMount(() => setState('authenticated', false));

    const oidcURL = () => localStorage.getItem('oidc_url') ?? '';
    const setOidcURL = (v: string) => localStorage.setItem('oidc_url', v);

    return (
        <div class="p-4">
            <div class="mb-4">
                <label for="url" class="block text-sm font-medium text-gray-700">
                    URL
                </label>
                <input
                    id="url"
                    type="text"
                    class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={oidcURL()}
                    onInput={(e) => setOidcURL(e.currentTarget.value)}
                />
            </div>
            <button
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={oidcAuth}
            >
                OIDC Auth
            </button>
        </div>
    );
};

export default Login;
