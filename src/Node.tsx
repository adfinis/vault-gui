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

type NodeProps = {
    icon: { path: JSXElement; outline: boolean; mini: boolean };
    kv: string;
    path: string;
};

const Node: Component<NodeProps> = (props) => {
    const [children, setChildren] = createSignal<NodeProps[]>([]);
    const [expanded, setExpanded] = createSignal(false);

    const chevron = () => (expanded() ? chevronDown : chevronRight);

    const listPath = async () => {
        setExpanded((v) => !v);
        if (!expanded()) return;

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
            <div>
                <Show when={props.path.endsWith('/') || props.path === ''}>
                    <button class="inline-block" onClick={listPath}>
                        <Icon path={chevron()} class="inline h-[1em]" />
                    </button>
                </Show>
                <Item {...props} />
            </div>
            <div class="pl-4">
                <Show when={expanded() && children()}>
                    <div>
                        <For each={children()}>{(child) => <Node {...child} />}</For>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default Node;
