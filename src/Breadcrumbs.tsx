import { Component, For } from 'solid-js'
import { setState, state } from './state'

const Breadcrumbs: Component = () => {
  const handleClick = (segment: string) => {
    if (state.path.indexOf(segment) === state.path.length - 1) return

    // // Slice the path up to and including the clicked segment
    const path = state.path.slice(0, state.path.indexOf(segment) + 1)
    setState({ page: 'list', path })
  }

  return (
    <div>
      <span onClick={() => setState({ page: 'list', path: [] })}>{state.kv}</span>
      <For each={state.path}>
        {segment => (
          <span
            class="[&:not(:last-of-type)]:cursor-pointer"
            onClick={() => handleClick(segment)}
          >
            {segment}/
          </span>
        )}
      </For>
    </div>
  )
}

export default Breadcrumbs
