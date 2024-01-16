import { For } from 'solid-js';
import { useAppContext } from './context';

const Breadcrumbs = (props: { page: string; kv: string; path: string }) => {
    const { updateContext } = useAppContext();
    const handleClick = (segment: string) => {
        // Slice the path up to and including the clicked segment
        const path = props.path
            .split('/')
            .slice(0, props.path.split('/').indexOf(segment) + 1)
            .join('/');
        updateContext({ page: 'list', path });
    };

    return (
        <div>
            <span onClick={() => updateContext({ page: 'list', path: '' })}>
                {props.kv}
            </span>
            <For each={props.path.split('/').filter((s) => s)}>
                {(segment) => (
                    <span
                        class="[&:not(:last-of-type)]:cursor-pointer"
                        onClick={() => handleClick(segment)}
                    >
                        {segment}/
                    </span>
                )}
            </For>
        </div>
    );
};

export default Breadcrumbs;
