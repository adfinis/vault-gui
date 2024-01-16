import { type Component } from 'solid-js';
import { setState } from './state';
import { Page } from './shared';

type SearchResultProps = {
    kv: string;
    path: string;
};

const SearchResult: Component<SearchResultProps> = (props) => {
    const handleClick = () => {
        let page: Page = 'list';
        if (!props.path.endsWith('/') && props.path !== '') {
            page = 'view';
        }
        setState({ page, kv: props.kv, path: props.path });
    };

    return (
        <div class="border-b-1 p-4">
            <span
                onClick={handleClick}
                class="cursor-pointer font-bold hover:underline"
            >
                {props.kv}
                {props.path}
            </span>
        </div>
    );
};

export default SearchResult;
