import { createSignal, For, Show, type Component } from 'solid-js'
import { useAppContext } from './context'
import SearchResult from './SearchResult'

type SearchIndexType = {
  [key: string]: string[]
}

interface SearchResult {
  kv: string
  path: string
}

const Search: Component = () => {
  const [search, setSearch] = createSignal('')
  const [searchResults, setSearchResults] = createSignal<SearchResult[]>([])
  const searchIndexRaw = localStorage.getItem('searchIndex')
  const searchIndex = (): SearchIndexType => {
    try {
      return JSON.parse(searchIndexRaw ?? {}) as SearchIndexType
    } catch (e) {
      console.log(e)
      return {}
    }
  }
  const runSearch = () => {
    console.log(`searching for ${search()}`)
    const searchTerm = search()
    const results = Object.entries(searchIndex()).flatMap(([kv, paths]) =>
      paths.filter(path => path.includes(searchTerm)).map(path => ({ kv, path }))
    )
    setSearchResults(results)
  }

  const { updateContext } = useAppContext()
  const gotoSearchIndex = () => {
    updateContext({ page: 'searchIndex' })
  }
  return (
    <div class="p-4">
      <div class="search">
        <form
          onSubmit={e => {
            e.preventDefault()
            runSearch()
          }}
        >
          <input
            type="text"
            value={search()}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            oninput={e => setSearch(e.currentTarget.value)}
            placeholder="Search..."
          />
        </form>
      </div>
      <div>
        <For each={searchResults()}>
          {item => (
            <>
              <SearchResult kv={item.kv} path={item.path} icon=""></SearchResult>
              <hr />
            </>
          )}
        </For>
        <Show when={searchResults().length === 0}>
          <span>
            No results? Try creating a{' '}
            <a href="#" onclick={gotoSearchIndex} class="font-bold underline">
              search index
            </a>
          </span>
        </Show>
      </div>
    </div>
  )
}

export default Search
