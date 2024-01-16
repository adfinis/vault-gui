import { createStore } from 'solid-js/store'

type State = {
  kv: string
  path: string[]
  page: 'home' | 'login' | 'view' | 'list'
  isSecret: boolean
}

const [state, setState] = createStore<State>({
  kv: undefined,
  page: 'login',
  path: [],
  isSecret: false
})

export { state, setState };
