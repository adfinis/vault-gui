import { invoke } from '@tauri-apps/api/tauri';
import { Icon } from 'solid-heroicons';
import {
    chevronDown,
    chevronRight,
    document as documentIcon,
    folder,
} from 'solid-heroicons/outline';
import { createSignal, For, JSXElement, Show, type Component } from 'solid-js';
import Item from './Item';
import { setState } from './state';

type NodeProps = {
    icon: { path: JSXElement; outline: boolean; mini: boolean };
    kv: string;
    path: string;
    displaySecret?: (path: string, kv: string) => void;
};

const Node: Component<NodeProps> = (props) => {
    const [children, setChildren] = createSignal([]);
    const [expanded, setExpanded] = createSignal(false);

    const chevron = () =>
        props.path.endsWith('/') || props.path === '' ? chevronDown : chevronRight;

    const listPath = async () => {
        setExpanded((v) => !v);
        if (expanded()) return;

        const response: string[] = await invoke('list_path', {
            mount: props.kv,
            path: props.path,
        });

        if (!(response instanceof Array)) return;
        response.sort();
        setChildren(
            response.map((subpath) => ({
                kv: props.kv,
                path: props.path + subpath,
                icon: subpath.endsWith('/') ? folder : documentIcon,
            })),
        );
    };

    return (
        <div>
            <div
                onClick={() =>
                    setState({
                        page: props.path.endsWith('/') || !props.path ? 'list' : 'view',
                        kv: props.kv,
                        path: props.path,
                    })
                }
            >
                <Show when={props.path.endsWith('/') || props.path === ''}>
                    <Icon onClick={listPath} path={chevron()} class="inline h-[1em]" />
                </Show>
                <Item {...props} />
            </div>
            <div class="pl-4">
                <Show when={expanded()}>
                    <div>
                        <For each={children()}>
                            {(child) => <Node class="ml-10" {...child} />}
                        </For>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default Node;
