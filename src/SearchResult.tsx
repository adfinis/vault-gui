import { type Component } from 'solid-js'
import { useAppContext } from './context'

type SearchResultProps = {
  kv: string
  path: string
}

const SearchResult: Component<SearchResultProps> = props => {
  const { updateContext } = useAppContext()

  const handleClick = () => {
    let page: string = 'list'
    if (!props.path.endsWith('/') && props.path !== '') {
      page = 'view'
    }
    updateContext({ page, kv: props.kv, path: props.path })
  }

  return (
    <div class="p-4 border-b-1">
      <span onClick={handleClick} class="cursor-pointer hover:underline font-bold">
        {props.kv}
        {props.path}
      </span>
    </div>
  )
}

export default SearchResult
