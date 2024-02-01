import { For, Show } from 'solid-js';
import { setState, state } from './state';
import { splitPath } from './utils';
import { useQueryClient } from '@tanstack/solid-query';

const Breadcrumbs = () => {
    const queryClient = useQueryClient();
    const handleClick = (segment: string) => {
        const path = splitPath(state.path)
            .slice(0, splitPath(state.path).indexOf(segment) + 1)
            .join('');
        setState({ page: 'list', path });
    };

    return (
        <>
            <div class="flex py-2">
                <div class="w-full">
                    <span onClick={() => setState({ page: 'list', path: '' })}>
                        {state.kv}
                    </span>
                    <For each={splitPath(state.path)}>
                        {(segment) => (
                            <span
                                class="[&:not(:last-of-type)]:cursor-pointer"
                                onClick={() => handleClick(segment)}
                            >
                                {segment}
                            </span>
                        )}
                    </For>
                </div>
                <Show when={state.page !== 'login'}>
                    <button
                        class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() =>
                            state.kv
                                ? queryClient.refetchQueries({
                                      queryKey: ['paths', state.kv, state.path],
                                  })
                                : queryClient.refetchQueries({
                                      queryKey: ['kvs'],
                                  })
                        }
                    >
                        refresh
                    </button>
                </Show>
            </div>
        </>
    );
};

export default Breadcrumbs;
