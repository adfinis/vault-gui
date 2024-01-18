import { invoke } from '@tauri-apps/api/tauri';
import toast from 'solid-toast';

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
}): Promise<string[] | undefined> => {
    try {
        return await invoke('list_path', {
            mount,
            path,
        });
    } catch (e) {
        toast.error(`${e}`);
    }
};

const fetchSecret = async ({
    mount,
    path,
}: {
    mount: string;
    path: string;
}): Promise<Record<string, string> | undefined> => {
    try {
        return await invoke('get_secret', {
            mount,
            path,
        });
    } catch (e) {
        toast.error(`${e}`);
    }
};

const fetchKVS = async (): Promise<string[] | undefined> => {
    try {
        return await invoke('list_kvs');
    } catch (e) {
        toast.error(`${e}`);
    }
};

export { splitPath, fetchPaths, fetchSecret, fetchKVS };
