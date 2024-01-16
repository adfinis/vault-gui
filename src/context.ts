import { createContext, useContext } from 'solid-js';

interface AppContextType {
    contextValue: () => { page: string; kv: string; path: string };
    updateContext: (newValue: { page?: string; kv?: string; path?: string }) => void;
}

export const AppContext = createContext<AppContextType>();
export const useAppContext = () => useContext(AppContext);
