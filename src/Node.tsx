import { invoke } from '@tauri-apps/api/tauri'
import { Icon } from 'solid-heroicons'
import {
  chevronDown,
  chevronRight,
  document as documentIcon,
  folder
} from 'solid-heroicons/outline'
import { createSignal, For, JSXElement, Show, type Component } from 'solid-js'
import { useAppContext } from './context'
import Item from './Item'

type NodeProps = {
  icon: { path: JSXElement; outline: boolean; mini: boolean }
  kv: string
  path: string
  displaySecret?: (path: string, kv: string) => void
}

const Node: Component<NodeProps> = props => {
  const { updateContext } = useAppContext()

  const [children, setChildren] = createSignal([])
  const [expanded, setExpanded] = createSignal(false)

  const chevron = () =>
    props.path.endsWith('/') || props.path === '' ? chevronDown : chevronRight

  const handleClick = () => {
    let page: string = 'list'
    if (!props.path.endsWith('/') && props.path !== '') {
      page = 'view'
    }
    updateContext({ page, kv: props.kv, path: props.path })
  }

  const listPath = async () => {
    setExpanded(v => !v)
    if (expanded()) return

    const response: string[] = await invoke('list_path', {
      mount: props.kv,
      path: props.path
    })
    if (!(response instanceof Array)) return
    response.sort()
    setChildren(
      response.map(subpath => ({
        kv: props.kv,
        path: props.path + subpath,
        icon: subpath.endsWith('/') ? folder : documentIcon
      }))
    )
  }

  return (
    <div>
      <div onClick={handleClick}>
        <Show when={props.path.endsWith('/') || props.path === ''}>
          <Icon onClick={listPath} path={chevron()} class="h-[1em] inline" />
        </Show>
        <Item {...props} />
      </div>
      <div class="pl-4">
        <Show when={expanded()}>
          <div>
            <For each={children()}>{child => <Node class="ml-10" {...child} />}</For>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default Node
