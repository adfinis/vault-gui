import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, type Component } from 'solid-js'

const SearchIndex: Component = () => {
  const [progress, setProgress] = createSignal(0)
  const [status, setStatus] = createSignal('')
  const [maxProgress, setMaxProgress] = createSignal(1)

  const listKVS = async (): Promise<null | string[]> => {
    try {
      return await invoke('list_kvs')
    } catch (e) {
      console.log(e)
    }
  }

  const listPaths = async (kv: string, path: path): Promise<null | string[]> => {
    try {
      return await invoke('list_path', { mount: kv, path: path })
    } catch {
      return null
    }
  }

  const indexRecursively = async (kv: string, paths: string[]): Promise<string[]> => {
    const allPaths: string[] = [...paths]

    for (const path of paths) {
      console.log(path)
      setStatus(`Indexing ${kv}${path}`)
      const subPaths = await listPaths(kv, path)
      if (subPaths && subPaths.length > 0) {
        // Add the parent path
        const absoluteSubPaths = subPaths.map(subPath => path + subPath)
        allPaths.push(...absoluteSubPaths) // Collect new paths
      }
    }

    // If new paths were added, recurse with the new set of paths
    const newAddedPaths = allPaths.slice(paths.length)
    if (newAddedPaths.length > 0) {
      return indexRecursively(kv, newAddedPaths)
    }

    // Base case: no new paths were added, return all paths
    return allPaths
  }

  const createSearchIndex = async () => {
    const searchIndex = {}
    const kvs = await listKVS()
    let totalPaths = 0
    setMaxProgress(kvs?.length || 0)
    for (const kv of kvs || []) {
      const paths = await indexRecursively(kv, [''])
      searchIndex[kv] = paths
      totalPaths += paths.length
      setProgress(prev => prev + 1)
    }
    setStatus(
      `Search indexing done. Indexed ${totalPaths} paths in ${kvs.length} KV stores.`
    )
    localStorage.setItem('searchIndex', JSON.stringify(searchIndex))
  }

  return (
    <div class="p-4">
      <h3 class="text-l font-bold">Create Search Index</h3>
      <p>
        This will create a local search index by recursively looking up all paths in all
        KV stores. Depending on your KV size, this might take a while.
      </p>
      <div>
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={createSearchIndex}
        >
          Create Search Index
        </button>
      </div>
      <div>
        <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700 mt-4">
          <div
            class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            style={`width: ${(progress() / maxProgress()) * 100}%`}
          ></div>
          <span>{status}</span>
        </div>
      </div>
    </div>
  )
}

export default SearchIndex
