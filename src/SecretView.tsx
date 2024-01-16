import { writeText } from '@tauri-apps/api/clipboard';
import { invoke } from '@tauri-apps/api/tauri';
import { createResource, For, Show, type Component } from 'solid-js';
import { useAppContext } from './context';

const fetchSecret = async (contextValue: {
    page: string;
    kv: string;
    path: string;
}): Promise<string[]> =>
    await invoke('get_secret', {
        mount: contextValue.kv,
        path: contextValue.path,
    });

const SecretView: Component = () => {
    const { contextValue } = useAppContext();
    const [secrets] = createResource(contextValue, fetchSecret);

    return (
        <div>
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Key
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Value
                        </th>
                        <th scope="col" class="px-6 py-3" />
                    </tr>
                </thead>
                <tbody>
                    <Show when={secrets()} fallback={<strong>Loading...</strong>}>
                        <For each={Object.entries(secrets())}>
                            {([key, value]) => (
                                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <th
                                        scope="row"
                                        class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {key}
                                    </th>
                                    <td class="px-6 py-4">
                                        <Show
                                            when={
                                                key === 'description' ||
                                                key === 'username'
                                            }
                                            fallback={value.replace(/./g, '*')}
                                        >
                                            {value}
                                        </Show>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a
                                            class="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            onClick={() => writeText(value)}
                                        >
                                            Copy
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </For>
                    </Show>
                </tbody>
            </table>
        </div>
    );
};

export default SecretView;
