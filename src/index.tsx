import { Show } from 'solid-js';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import toast, { Toaster } from 'solid-toast';

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
            <App />
            <Show when={import.meta.env.DEV}>
                <SolidQueryDevtools initialIsOpen={false} />
            </Show>
            <Toaster position="bottom-right" />
        </QueryClientProvider>
    ),
    document.getElementById('root'),
);
