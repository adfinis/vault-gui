import { createStore } from 'solid-js/store';

type State = {
    kv: string;
    path: string;
    authenticated: boolean;
};

const [state, setState] = createStore<State>({
    kv: '',
    path: '',
    authenticated: false,
});

export { state, setState };
