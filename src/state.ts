import { createStore } from 'solid-js/store';
import { Page } from './shared';

type State = {
    page: Page;
    kv: string;
    path: string;
    history?: State[];
};

const [state, setState] = createStore<State>({
    page: 'login',
    kv: '',
    path: '',
    history: [],
});

const updateState = (newState: Partial<State>) => {
    // Ensure newState is an object and not being spread as an array
    if (typeof newState !== 'object' || newState === null) {
        console.error('newState must be an object', newState);
        return;
    }

    // Create a new history array
    const history = state.history ? [...state.history, { ...state }] : [{ ...state }];

    // Update the state with the new values and the new history
    setState({ ...state, ...newState, history });
};

const goBack = () => {
    if (state.history && state.history.length > 0) {
        const history = [...state.history];
        const previousState = history.pop();
        setState({ ...previousState, history });
    }
};

export { state, updateState as setState, goBack };
