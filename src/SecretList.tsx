import { document as documentIcon, folder } from 'solid-heroicons/outline';
import {
    createEffect,
    createResource,
    createSignal,
    For,
    Show,
    type Component,
} from 'solid-js';
import Item from './Item';
import { fetchPaths } from './utils';
import { state } from './state';

const ListView: Component = () => {
    const [secrets] = createResource(
        () => ({ mount: state.kv, path: state.path }),
        fetchPaths,
    );

    const [search, setSearch] = createSignal('');

    // Cler the filter field on path change
    createEffect(() => {
        if (state.path) {
            setSearch('');
        }
    });

    return (
        <div class="p-5">
            <input
                type="text"
                value={search()}
                class="focus:ring-black-500 focus:border-black-500 dark:focus:ring-white-500 dark:focus:border-white-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                onInput={(e) => setSearch(e.currentTarget.value)}
                placeholder="Filter results..."
            />
            {secrets.loading && <strong>Loading...</strong>}
            <Show when={secrets()}>
                <For each={secrets()}>
                    {(item) => (
                        <div>
                            <Show when={item.includes(search()) || search() === ''}>
                                <Item
                                    kv={state.kv}
                                    path={state.path + item}
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
