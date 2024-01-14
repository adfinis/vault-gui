import { createLocalStore } from '@solid-primitives/local-store'
import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, For, type Component } from 'solid-js'
import { useAppContext } from './context'

type NodeProps = {
  icon: string
  kv: string
  path: string
  displaySecret: (path: string, kv: string) => void
}

const Node: Component<NodeProps> = props => {
  const { contextValue, updateContext } = useAppContext()

  const [children, setChildren] = createSignal([])
  const [expanded, setExpanded] = createSignal(false)

  function handleClick() {
    if (!props.path.endsWith('/') && props.path !== '') {
      updateContext({ page: 'view', kv: props.kv, path: props.path })
      return
    }
    if (!expanded()) {
      void (async () => {
        const response: string[] = await invoke('list_path', {
          mount: props.kv,
          path: props.path
        })
        if (Array.isArray(response)) {
          // sort the array alphabetically first
          response.sort()
          setChildren(
            response.map(subpath => ({
              kv: props.kv,
              path: props.path + subpath,
              icon: subpath.endsWith('/') ? '📁' : '📄'
            }))
          )
        }
      })()
    }
    setExpanded(!expanded())
  }

  return (
    <div>
      <div onClick={handleClick}>
        {props.path.endsWith('/') || props.path === '' ? (
          expanded() ? (
            <span>▾</span>
          ) : (
            <span>▸</span>
          )
        ) : (
          ''
        )}
        {props.icon}
        {props.path === '' ? props.kv : props.path.replace(/\/+$/, '').split('/').pop()}
      </div>
      <div class="pl-4">
        {expanded() && (
          <div>
            <For each={children()}>{child => <Node class="ml-10" {...child} />}</For>
          </div>
        )}
      </div>
    </div>
  )
}

export default Node
