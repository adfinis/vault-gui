import { createStore } from 'solid-js/store';
import { Page } from './shared';

type State = {
    page: Page;
    kv: string;
    path: string;
};

const [state, setState] = createStore<State>({ page: 'login', kv: '', path: '' });

export { state, setState };
