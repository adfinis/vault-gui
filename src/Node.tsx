import { invoke } from '@tauri-apps/api/tauri'
import { Icon } from 'solid-heroicons'
import {
  chevronDown,
  chevronRight,
  document as documentIcon,
  folder
} from 'solid-heroicons/outline'
import { createResource, For, JSXElement, Show, type Component, createSignal, createEffect } from 'solid-js'
import { toast } from 'solid-toast'
import Item from './Item'
import { setState, state } from './state'

type NodeProps = {
  icon: { path: JSXElement; outline: boolean; mini: boolean }
  kv: string
  path: string[]
  isSecret: boolean
}


const Node: Component<NodeProps> = props => {
  const expanded = () =>
    props.kv === state.kv &&
    props.path.join('/') == state.path.slice(0, props.path.length).join('/')

  const [paths, setPaths] = createSignal([])
  const chevron = () => (props.isSecret || expanded() ? chevronDown : chevronRight)

  const fetchPaths = async () => {
    try {
      const paths: string[] = await invoke('list_path', {
        mount: props.kv,
        path: props.path.join('/') + '/'
      })

      setPaths(paths.map(subpath => ({
        kv: props.kv,
        path: [...props.path, subpath.replace('/', '')],
        isSecret: !subpath.endsWith('/'),
        icon: subpath.endsWith('/') ? folder : documentIcon
      })))

    } catch (e) {
      toast.error(`${e}`)
      return []
    }
  };

  createEffect(() => {
    if (expanded()) void fetchPaths()
    console.log(paths(), state)
  })

  return (
    <div>
      <div
        onClick={() =>
          setState({
            page: props.isSecret ? 'view' : 'list',
            isSecret: props.isSecret,
            kv: props.kv,
            path: props.path
          })
        }
      >
        <Show when={!props.isSecret}>
          <Icon
            onClick={() => setState({ kv: props.kv, path: props.path })}
            path={chevron()}
            class="h-[1em] inline"
          />
        </Show>
        <Item {...props} />
      </div>
      <div class="pl-4">
        <Show when={paths()}>
          <For each={paths()}>{path => <Node {...path} />}</For>
        </Show>
      </div>
    </div>
  )
}

export default Node
