import { invoke } from '@tauri-apps/api/tauri';

const splitPath = (path: string): string[] =>
    path
        .replace(/\//gi, '/,')
        .split(',')
        .filter((segment) => !!segment);

const fetchPaths = async ({
    mount,
    path,
}: {
    mount: string;
    path: string;
}): Promise<string[] | null> =>
    await invoke('list_path', {
        mount,
        path,
    });

const fetchSecret = async ({
    mount,
    path,
}: {
    mount: string;
    path: string;
}): Promise<Record<string, string> | null> =>
    await invoke('get_secret', {
        mount,
        path,
    });

const fetchKVS = async (): Promise<string[] | null> => await invoke('list_kvs');

const toSorted = <T>(array: Array<T>): Array<T> => [...array].sort();

export { splitPath, fetchPaths, fetchSecret, fetchKVS, toSorted };
