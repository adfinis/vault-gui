import { For } from 'solid-js';
import { setState, state } from './state';
import { splitPath } from './utils';

const Breadcrumbs = () => {
    const handleClick = (segment: string) => {
        const path = splitPath(state.path)
            .slice(0, splitPath(state.path).indexOf(segment) + 1)
            .join('');
        setState({ page: 'list', path });
    };

    return (
        <div>
            <span onClick={() => setState({ page: 'list', path: '' })}>{state.kv}</span>
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
    );
};

export default Breadcrumbs;
