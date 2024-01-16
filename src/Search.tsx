import { createSignal, For, Show, type Component } from 'solid-js';
import SearchResult from './SearchResult';
import { setState } from './state';

type SearchIndexType = {
    [key: string]: string[];
};

interface SearchResult {
    kv: string;
    path: string;
}

const Search: Component = () => {
    const [search, setSearch] = createSignal('');
    const [searchResults, setSearchResults] = createSignal<SearchResult[]>([]);
    const searchIndexRaw = localStorage.getItem('searchIndex');
    const searchIndex = (): SearchIndexType => {
        try {
            return JSON.parse(searchIndexRaw ?? '{}') as SearchIndexType;
        } catch (e) {
            console.log(e);
            return {};
        }
    };
    const runSearch = () => {
        console.log(`searching for ${search()}`);
        const searchTerm = search();
        const results = Object.entries(searchIndex()).flatMap(([kv, paths]) =>
            paths
                .filter((path) => path.includes(searchTerm))
                .map((path) => ({ kv, path })),
        );
        setSearchResults(results);
    };

    return (
        <div class="p-4">
            <div class="search">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        runSearch();
                    }}
                >
                    <input
                        type="text"
                        value={search()}
                        class="focus:ring-black-500 focus:border-black-500 dark:focus:ring-white-500 dark:focus:border-white-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        onInput={(e) => setSearch(e.currentTarget.value)}
                        placeholder="Search..."
                    />
                </form>
            </div>
            <div>
                <For each={searchResults()}>
                    {(item) => (
                        <>
                            <SearchResult kv={item.kv} path={item.path} />
                            <hr />
                        </>
                    )}
                </For>
                <Show when={searchResults().length === 0}>
                    <span>
                        No results? Try creating a{' '}
                        <a
                            href="#"
                            onClick={() => setState('page', 'searchIndex')}
                            class="font-bold underline"
                        >
                            search index
                        </a>
                    </span>
                </Show>
            </div>
        </div>
    );
};

export default Search;
