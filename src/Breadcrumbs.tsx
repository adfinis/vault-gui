import { useAppContext } from './context'

const Breadcrumbs = (props: { page: string; kv: string; path: string }) => {
  const { updateContext } = useAppContext()

  const handleClick = (index: number) => {
    // Slice the path up to and including the clicked segment
    const newPath =
      props.path
        .split('/')
        .slice(0, index + 1)
        .join('/') + '/'
    updateContext({ page: 'list', kv: props.kv, path: newPath })
  }

  return (
    <div>
      <span>{props.kv}</span>
      {props.path.split('/').map((segment, index, array) => (
        <span>
          {index < array.length - 1 ? (
            // Making each segment clickable, except the last one
            <a href="#" onClick={() => handleClick(index)}>
              {segment}/
            </a>
          ) : (
            <span>{segment}</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default Breadcrumbs
