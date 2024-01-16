import { invoke } from '@tauri-apps/api/tauri'
import { Icon } from 'solid-heroicons'
import {
  chevronDown,
  chevronRight,
  document as documentIcon,
  folder
} from 'solid-heroicons/outline'
import { createSignal, For, JSXElement, Show, type Component } from 'solid-js'
import Item from './Item'
import { setState, state } from './state'

type NodeProps = {
  icon: { path: JSXElement; outline: boolean; mini: boolean }
  kv: string
  path: string[]
  isSecret: boolean
}

const Node: Component<NodeProps> = props => {
  const [nodes, setNodes] = createSignal([])
  // const [expanded, setExpanded] = createSignal(false)

  const chevron = () =>
    props.isSecret || props.path == state.path ? chevronDown : chevronRight

  const handleClick = () => {
    let page: 'list' | 'view' = 'list'
    if (props.isSecret && !props.path.length) {
      page = 'view'
    }
    setState({ page, kv: props.kv, path: props.path })
  }

  const expanded = () =>
    props.path.join('/') === state.path.slice(0, props.path.length - 1).join('/')

  const listPath = async () => {
    // setExpanded(v => !v)
    if (expanded()) return

    const response: string[] = await invoke('list_path', {
      mount: props.kv,
      path: props.path.join('/')
    })

    if (!(response instanceof Array)) return
    response.sort()
    setNodes(
      response.map(subpath => ({
        kv: props.kv,
        path: [...props.path, subpath.replace('/', '')],
        isSecret: subpath.endsWith('/'),
        icon: subpath.endsWith('/') ? folder : documentIcon
      }))
    )
  }

  return (
    <div>
      <div onClick={handleClick}>
        <Show when={!props.isSecret || props.path.length}>
          <Icon onClick={listPath} path={chevron()} class="h-[1em] inline" />
        </Show>
        <Item {...props} />
      </div>
      <div class="pl-4">
        <Show when={expanded()}>
          <div>
            <For each={nodes()}>{node => <Node class="ml-10" {...node} />}</For>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default Node
