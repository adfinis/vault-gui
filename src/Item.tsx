import { Icon } from 'solid-heroicons'
import { JSXElement, Show, type Component } from 'solid-js'
import { setState, state } from './state'

type ItemProps = {
  icon: { path: JSXElement; outline: boolean; mini: boolean }
  kv: string
  path: string[]
  isSecret: boolean
}

const Item: Component<ItemProps> = props => {
  return (
    <span
      onClick={() =>
        setState({
          page: props.isSecret && props.path.length ? 'view' : 'list',
          kv: props.kv,
          path: props.path
        })
      }
      class="cursor-pointer"
    >
      <Icon path={props.icon} class="h-[1em] inline" />
      <span
        classList={{
          'font-bold': state.path === props.path && !!state.path.length
        }}
      >
        <Show when={!props.path.length} fallback={props.path.at(-1)}>
          <span
            classList={{
              'font-bold': !state.path.length && state.kv === props.kv
            }}
          >
            {props.kv}
          </span>
        </Show>
      </span>
    </span>
  )
}

export default Item
