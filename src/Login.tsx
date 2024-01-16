import { invoke } from '@tauri-apps/api/tauri'
import { type Component } from 'solid-js'
import toast from 'solid-toast'
import { setState } from './state'

const Login: Component = () => {
  const oidcAuth = async () => {
    try {
      await invoke('oidc_auth', { address: oidcURL(), mount: 'oidc' })
      setState('page', 'home')
    } catch (e) {
      toast.error(`${e}`)
    }
  }

  const oidcURL = () => localStorage.getItem('oidc_url') ?? ''
  const setOidcURL = (v: string) => localStorage.setItem('oidc_url', v)

  return (
    <div class="p-4">
      <div class="mb-4">
        <label for="url" class="block text-sm font-medium text-gray-700">
          URL
        </label>
        <input
          id="url"
          type="text"
          class="mt-1 p-2 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={oidcURL()}
          onInput={e => setOidcURL(e.currentTarget.value)}
        />
      </div>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={oidcAuth}
      >
        OIDC Auth
      </button>
    </div>
  )
}

export default Login
