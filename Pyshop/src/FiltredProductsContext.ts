
import { createContext } from "react";
import { TProduct } from "./TProduct"


interface FiltredProductsContextProps {
    filteredProducts: TProduct[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
}


const FilteredProductsContext = createContext<FiltredProductsContextProps | undefined>(undefined);

export {FilteredProductsContext};
export type {FiltredProductsContextProps}