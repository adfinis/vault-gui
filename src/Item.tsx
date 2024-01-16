import { Icon } from 'solid-heroicons';
import { JSXElement, Show, type Component } from 'solid-js';
import { useAppContext } from './context';

type ItemProps = {
    icon: { path: JSXElement; outline: boolean; mini: boolean };
    kv: string;
    path: string;
};

const Item: Component<ItemProps> = (props) => {
    const { contextValue, updateContext } = useAppContext();

    const handleClick = () => {
        let page: string = 'list';
        if (!props.path.endsWith('/') && props.path !== '') {
            page = 'view';
        }
        updateContext({ page, kv: props.kv, path: props.path });
    };

    return (
        <span onClick={handleClick} class="cursor-pointer">
            <Icon path={props.icon} class="inline h-[1em]" />
            <span
                classList={{
                    'font-bold':
                        contextValue().path === props.path && props.path !== '',
                }}
            >
                <Show
                    when={props.path === ''}
                    fallback={props.path.replace(/\/+$/, '').split('/').pop()}
                >
                    <span
                        classList={{
                            'font-bold':
                                contextValue().path === '' &&
                                contextValue().kv === props.kv,
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
