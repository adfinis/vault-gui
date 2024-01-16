import { For } from 'solid-js'
import { setState, state } from './state'

const Breadcrumbs = (props) => {
  const handleClick = (segment: string) => {
    console.log(segment)
    if (props.path.lastIndexOf(segment) === props.path.length - 1)
      return

    // // Slice the path up to and including the clicked segment
    const path = props.path
      .slice(0, props.path.split('/').indexOf(segment) + 1)
    setState({ page: 'list', path })
    console.log(segment)
  }

  return (
    <div>
      <span onClick={() => setState({ page: 'list', path: [''] })}>{state.kv}</span>
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
