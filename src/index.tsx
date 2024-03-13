import { Show } from 'solid-js';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

import { Navigate, Route, Router } from '@solidjs/router';
import { state } from './state';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import toast, { Toaster } from 'solid-toast';
import { Home, Login, Search, SearchIndex, SecretList, SecretView } from './pages';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 5,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => toast.error(`${error}`),
    }),
});

render(
    () => (
        <QueryClientProvider client={queryClient}>
            <Router root={App}>
                <Route
                    path="/"
                    component={() => (
                        <Navigate href={state.authenticated ? '/home' : '/login'} />
                    )}
                />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/view" component={SecretView} />
                <Route path="/list" component={SecretList} />
                <Route path="/search-index" component={SearchIndex} />
                <Route path="/search" component={Search} />
            </Router>
            <Show when={import.meta.env.DEV}>
                <SolidQueryDevtools initialIsOpen={false} />
            </Show>
            <Toaster position="bottom-right" />
        </QueryClientProvider>
    ),
    document.getElementById('root'),
);
