import { createSignal, type Component } from 'solid-js';
import { fetchKVS, fetchPaths } from './utils';
import toast from 'solid-toast';

const SearchIndex: Component = () => {
    const [progress, setProgress] = createSignal(0);
    const [status, setStatus] = createSignal('');
    const [maxProgress, setMaxProgress] = createSignal(1);

    const indexRecursively = async (kv: string, paths: string[]): Promise<string[]> => {
        const allPaths: string[] = Array.from(paths);

        for await (const path of paths.filter((p) => p.endsWith('/') || !p)) {
            setStatus(`Indexing ${kv}${path}`);
            const subPaths = await fetchPaths({ mount: kv, path });

            if (subPaths?.length) {
                // Add the parent path
                const absoluteSubPaths = subPaths.map((subPath) => path + subPath);
                allPaths.push(...absoluteSubPaths); // Collect new paths
            }
        }

        // If new paths were added, recurse with the new set of paths
        const newAddedPaths = allPaths.slice(paths.length);
        if (newAddedPaths.length > 0) {
            return indexRecursively(kv, newAddedPaths);
        }

        // Base case: no new paths were added, return all paths
        return allPaths;
    };

    const createSearchIndex = async () => {
        const searchIndex: Record<string, string[]> = {};
        const kvs = await fetchKVS();
        if (!kvs) {
            toast.error('Unable to create search index.');
            return;
        }
        let totalPaths = 0;
        setMaxProgress(kvs.length);
        for await (const kv of kvs) {
            const paths = await indexRecursively(kv, ['']);
            searchIndex[kv] = paths;
            totalPaths += paths.length;
            setProgress((prev) => prev + 1);
        }

        setStatus(
            `Search indexing done. Indexed ${totalPaths} paths in ${kvs.length} KV stores.`,
        );

        localStorage.setItem('searchIndex', JSON.stringify(searchIndex));
    };

    return (
        <div class="p-4">
            <h3 class="text-l font-bold">Create Search Index</h3>
            <p>
                This will create a local search index by recursively looking up all
                paths in all KV stores. Depending on your KV size, this might take a
                while.
            </p>
            <div>
                <button
                    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={createSearchIndex}
                >
                    Create Search Index
                </button>
            </div>
            <div>
                <div class="mb-4 mt-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        class="h-1.5 rounded-full bg-blue-600 dark:bg-blue-500"
                        style={{
                            width: `${(progress() / maxProgress()) * 100}%`,
                        }}
                    />
                    <span>{status()}</span>
                </div>
            </div>
        </div>
    );
};

export default SearchIndex;
