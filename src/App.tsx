import { Icon } from 'solid-heroicons';
import { lockClosed, magnifyingGlass } from 'solid-heroicons/outline';
import { For, ParentComponent, Show } from 'solid-js';
import vault from './assets/vault-logo.svg';
import Breadcrumbs from './Breadcrumbs';
import Node from './Node';
import { state } from './state';
import { fetchKVS, toSorted } from './utils';
import { createQuery } from '@tanstack/solid-query';
import { A } from '@solidjs/router';

const App: ParentComponent = (props) => {
    const kvsQuery = createQuery(() => ({
        queryKey: ['kvs'],
        queryFn: fetchKVS,
        enabled: state.authenticated,
    }));

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
                            <Show when={state.authenticated}>
                                <A
                                    class="text-foreground/60 hover:text-foreground/80 no-underline transition-colors lg:block"
                                    href="/search"
                                >
                                    <Icon
                                        path={magnifyingGlass}
                                        class="h-5 w-5 text-white"
                                    />
                                </A>
                            </Show>
                        </nav>
                    </div>
                </div>
            </header>
            <div class="flex">
                <div
                    class="w-1/3 select-none resize-x overflow-auto overflow-x-scroll whitespace-nowrap border-r bg-neutral-100 pl-2"
                    classList={{ hidden: !state.authenticated }}
                >
                    <div class="mt-4">
                        <Show when={kvsQuery.isPending}>
                            <strong>Loading...</strong>
                        </Show>
                        <Show when={kvsQuery.isSuccess}>
                            <For each={toSorted(kvsQuery.data)}>
                                {(kv) => <Node kv={kv} path="" icon={lockClosed} />}
                            </For>
                        </Show>
                    </div>
                </div>
                <main class="flex-1 p-5">
                    <h1 class="text-xl font-bold">
                        <Breadcrumbs />
                    </h1>
                    {props.children}
                </main>
            </div>
        </>
    );
};

export default App;
