import { invoke } from '@tauri-apps/api/tauri';
import { document as documentIcon, folder } from 'solid-heroicons/outline';
import { createResource, createSignal, For, Show, type Component } from 'solid-js';
import { useAppContext } from './context';
import Item from './Item';
import toast from 'solid-toast';

const fetchPaths = async (contextValue: {
    page: string;
    kv: string;
    path: string;
}): Promise<null | string[]> => {
    try {
        return await invoke('list_path', {
            mount: contextValue.kv,
            path: contextValue.path,
        });
    } catch (e) {
        toast.error(e);
    }
};

const ListView: Component = () => {
    const { contextValue } = useAppContext();

    const [secrets] = createResource(contextValue, fetchPaths);
    const [search, setSearch] = createSignal('');

    return (
        <div class="p-5">
            <input
                type="text"
                value={search()}
                class="focus:ring-black-500 focus:border-black-500 dark:focus:ring-white-500 dark:focus:border-white-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                onInput={(e) => setSearch(e.currentTarget.value)}
                placeholder="Filter results..."
            />
            <Show when={secrets()} fallback={<span class="text-bold">Loading...</span>}>
                <For each={secrets()}>
                    {(item) => (
                        <div>
                            <Show when={item.includes(search()) || search() === ''}>
                                <Item
                                    kv={contextValue().kv}
                                    path={contextValue().path + '/' + item}
                                    icon={item.endsWith('/') ? folder : documentIcon}
                                />
                            </Show>
                        </div>
                    )}
                </For>
            </Show>
        </div>
    );
};

export default ListView;
