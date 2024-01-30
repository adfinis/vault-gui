import { document as documentIcon, folder } from 'solid-heroicons/outline';
import { createEffect, createSignal, For, Show, type Component } from 'solid-js';
import Item from './Item';
import { fetchPaths } from './utils';
import { state } from './state';
import { createQuery } from '@tanstack/solid-query';
import { toSorted } from './utils';

const ListView: Component = () => {
    console.log(state.path);
    const query = createQuery(() => ({
        queryKey: ['paths', state.kv, state.path],
        queryFn: () => fetchPaths({ mount: state.kv, path: state.path }),
        enabled: !state.path || state.path.endsWith('/'),
    }));

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
            <Show when={query.isPending}>
                <strong>loading...</strong>
            </Show>
            <Show when={query.isError}>
                <strong>{query.error.toString()}</strong>
            </Show>
            <Show when={query.isSuccess}>
                <For each={toSorted(query.data)}>
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
