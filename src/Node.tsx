import { Icon } from 'solid-heroicons';
import {
    chevronDown,
    chevronRight,
    document as documentIcon,
    folder,
} from 'solid-heroicons/outline';
import { createSignal, For, JSXElement, Show, type Component } from 'solid-js';
import Item from './Item';
import { createQuery } from '@tanstack/solid-query';
import { fetchPaths, toSorted } from './utils';

type NodeProps = {
    icon: { path: JSXElement; outline: boolean; mini: boolean };
    kv: string;
    path: string;
    displaySecret?: (path: string, kv: string) => void;
};

const Node: Component<NodeProps> = (props) => {
    const [expanded, setExpanded] = createSignal(false);
    const query = createQuery(() => ({
        queryKey: ['paths', props.kv, props.path],
        queryFn: () => fetchPaths({ mount: props.kv, path: props.path }),
        enabled: expanded(),
    }));

    const chevron = () => (expanded() ? chevronDown : chevronRight);

    return (
        <div>
            <div>
                <Show when={props.path.endsWith('/') || props.path === ''}>
                    <button class="inline-block" onClick={() => setExpanded((v) => !v)}>
                        <Icon path={chevron()} class="inline h-[1em]" />
                    </button>
                </Show>
                <Item {...props} />
            </div>
            <div class="pl-4">
                <Show when={expanded()}>
                    <div>
                        <Show when={query.isPending}>
                            <strong>loading...</strong>
                        </Show>
                        <Show when={query.isSuccess}>
                            <For
                                each={toSorted(query.data).map((subpath) => ({
                                    kv: props.kv,
                                    path: props.path + subpath,
                                    icon: subpath.endsWith('/') ? folder : documentIcon,
                                }))}
                            >
                                {(node) => <Node {...node} />}
                            </For>
                        </Show>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default Node;
