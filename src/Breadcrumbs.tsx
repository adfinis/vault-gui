import { For, Show, createSignal } from 'solid-js';
import { setState, state } from './state';
import { splitPath } from './utils';
import { createQuery, useQueryClient } from '@tanstack/solid-query';
import { Icon } from 'solid-heroicons';
import { arrowPath } from 'solid-heroicons/outline';

const Breadcrumbs = () => {
    const [spinning, setSpinning] = createSignal(false);
    const queryClient = useQueryClient();
    const handleClick = (segment: string) => {
        const path = splitPath(state.path)
            .slice(0, splitPath(state.path).indexOf(segment) + 1)
            .join('');
        setState({ page: 'list', path });
    };

    const queryKey = () => (state.kv ? ['paths', state.kv, state.path] : ['kvs']);
    const query = createQuery(() => ({
        queryKey: queryKey(),
        enabled: false,
    }));

    const refresh = async () => {
        setSpinning(true);
        await queryClient.refetchQueries({ queryKey: queryKey() });
        setSpinning(false);
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
                        class="disabled:text-slate-900"
                        classList={{
                            'animate-[0.5s_spin_linear_infinite]': spinning(),
                        }}
                        disabled={query.isPending}
                        onClick={refresh}
                    >
                        <Icon path={arrowPath} class="w-[1em]" />
                    </button>
                </Show>
            </div>
        </>
    );
};

export default Breadcrumbs;
