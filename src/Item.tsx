import { Icon } from 'solid-heroicons';
import { JSXElement, Show, type Component } from 'solid-js';
import { setState, state } from './state';
import { splitPath } from './utils';

type ItemProps = {
    icon: { path: JSXElement; outline: boolean; mini: boolean };
    kv: string;
    path: string;
};

const Item: Component<ItemProps> = (props) => {
    return (
        <span
            onClick={() =>
                setState({
                    page: props.path.endsWith('/') || !props.path ? 'list' : 'view',
                    path: props.path,
                    kv: props.kv,
                })
            }
            class="cursor-pointer"
        >
            <Icon path={props.icon} class="inline h-[1em]" />
            <span
                classList={{
                    'font-bold': state.path === props.path && !!props.path,
                }}
            >
                <Show
                    when={props.path === ''}
                    fallback={splitPath(props.path).at(-1)?.replace('/', '')}
                >
                    <span
                        classList={{
                            'font-bold': state.path === '' && state.kv === props.kv,
                        }}
                    >
                        {props.kv}
                    </span>
                </Show>
            </span>
        </span>
    );
};

export default Item;
