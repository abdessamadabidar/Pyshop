import { createContext } from "react";


interface PageContextProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const PageContext = createContext<PageContextProps | undefined>(undefined)


export {PageContext}

export type {PageContextProps}