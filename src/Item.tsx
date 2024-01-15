import { Icon } from 'solid-heroicons'
import { JSXElement, Show, type Component } from 'solid-js'
import { useAppContext } from './context'

type ItemProps = {
  icon: { path: JSXElement; outline: boolean; mini: boolean }
  kv: string
  path: string
}

const Item: Component<ItemProps> = props => {
  const { contextValue, updateContext } = useAppContext()

  const handleClick = () => {
    let page: string = 'list'
    if (!props.path.endsWith('/') && props.path !== '') {
      page = 'view'
    }
    updateContext({ page, kv: props.kv, path: props.path })
  }

  return (
    <span onClick={handleClick} class="cursor-pointer">
      <Icon path={props.icon} class="h-[1em] inline" />
      <span classList={{ 'text-bold': contextValue().path === props.path }}>
        <Show
          when={props.path === ''}
          fallback={props.path.replace(/\/+$/, '').split('/').pop()}
        >
          {props.kv}
        </Show>
      </span>
    </span>
  )
}

export default Item
