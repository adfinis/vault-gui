import { Icon } from 'solid-heroicons';
import { lockClosed, magnifyingGlass } from 'solid-heroicons/outline';
import { createEffect, createResource, For, Show, type Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import vault from './assets/vault-logo.svg';
import Breadcrumbs from './Breadcrumbs';
import Login from './Login';
import Node from './Node';
import Search from './Search';
import SearchIndex from './SearchIndex';
import SecretList from './SecretList';
import SecretView from './SecretView';
import { Toaster } from 'solid-toast';
import { setState, state } from './state';
import { fetchKVS } from './utils';

const Home = () => <strong>Select a KV to get started</strong>;

const pageMap: { [key: string]: Component } = {
    home: Home,
    login: Login,
    view: SecretView,
    list: SecretList,
    searchIndex: SearchIndex,
    search: Search,
};

const App: Component = () => {
    const [kvs, { refetch }] = createResource(fetchKVS);

    createEffect(() => {
        if (state.page === 'home') refetch();
    });

    return (
        <>
            <header class="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b bg-black backdrop-blur">
                <div class="container flex h-14 items-center">
                    <div class="ml-4 flex">
                        <a
                            href="/"
                            class="mr-6 flex items-center space-x-2 no-underline"
                        >
                            <img src={vault} class="h-5 w-5" />
                            <span class="inline-block font-bold text-white">Vault</span>
                        </a>
                        <nav class="flex items-center space-x-6 text-sm font-medium">
                            <Show when={state.page !== 'login'}>
                                <a
                                    class="text-foreground/60 hover:text-foreground/80 no-underline transition-colors lg:block"
                                    href="#"
                                    onClick={() =>
                                        setState({
                                            page: 'search',
                                            kv: 'Search',
                                            path: '',
                                        })
                                    }
                                >
                                    <Icon
                                        path={magnifyingGlass}
                                        class="h-5 w-5 text-white"
                                    />
                                </a>
                            </Show>
                        </nav>
                    </div>
                </div>
            </header>
            <div class="flex">
                <div
                    class="w-1/3 select-none resize-x overflow-auto overflow-x-scroll whitespace-nowrap border-r bg-neutral-100 pl-2"
                    classList={{ hidden: state.page === 'login' }}
                >
                    <div class="mt-4">
                        {state.page !== 'login' && kvs.loading && (
                            <strong>Loading...</strong>
                        )}
                        <Show when={state.page !== 'login' && kvs()}>
                            <For each={kvs().sort()}>
                                {(kv) => <Node kv={kv} path="" icon={lockClosed} />}
                            </For>
                        </Show>
                    </div>
                </div>
                <main class="flex-1 p-5">
                    <h1 class="text-xl font-bold">
                        <Breadcrumbs />
                    </h1>
                    <Dynamic component={pageMap[state.page]} />
                </main>
                <Toaster position="bottom-right" />
            </div>
        </>
    );
};

export default App;
