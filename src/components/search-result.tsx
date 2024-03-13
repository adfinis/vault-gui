import { type Component } from 'solid-js';
import { A } from '@solidjs/router';

type SearchResultProps = {
    kv: string;
    path: string;
};

const SearchResult: Component<SearchResultProps> = (props) => {
    const href = () => (props.path && props.path.endsWith('/') ? '/view' : '/list');

    return (
        <div class="border-b-1 p-4">
            <A href={href()} class="cursor-pointer font-bold hover:underline">
                {props.kv}
                {props.path}
            </A>
        </div>
    );
};

export default SearchResult;
