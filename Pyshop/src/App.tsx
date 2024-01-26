import './App.css'
import {IconContext} from "react-icons";
import {IoNavigateCircleOutline} from "react-icons/io5";
import {SearchInput} from "./components/input.tsx";
import {FaGithub} from "react-icons/fa";
import { useEffect, useRef, useState} from "react";
import Button from "./components/button.tsx";
import Pagination from "./components/pagination.tsx";
import axios from 'axios';
import { PageContext } from './PageContext.ts';
import { PageContextProps } from './PageContext.ts';
import { TProduct } from './TProduct.ts';
import Product from './components/product.tsx';
import { FilteredProductsContext, FiltredProductsContextProps } from './FiltredProductsContext.ts';

function App() {


    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products?page=${currentPage}&page_size=${itemsPerPage}`)
        .then(res => {
            setProducts(res.data.products); 
            setTotalPages(res.data.total_pages)
        })
        .catch(err => console.log(err))

    }, [currentPage])



    useEffect(() => {
        console.log(currentPage)
    }, [currentPage])




    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');





    const productsSectionRef = useRef<HTMLDivElement | null>(null);
    const handleScroll = () => {
         if (productsSectionRef) {
             productsSectionRef.current?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
         }
    }

    const handleSearchInputChange = (value: string) => {
        productsSectionRef.current?.scrollIntoView({behavior: "smooth"})
        setSearchInput(value);
    }

    useEffect(() => {
        setFilteredProducts(products)
    }, [products]);

    useEffect(() => {
        const filter = products.filter((product : TProduct)  => product.ProductTitle.toLowerCase().includes(searchInput.toLowerCase()))
        setFilteredProducts(filter)

    }, [searchInput])


    const displayProducts =  () : JSX.Element[] | JSX.Element => {
        if (filteredProducts.length > 0) {
            return filteredProducts.map((product, key) => <Product product={product} key={key} />)
        }
        return <span className="text-center text-sm text-white">no products found</span>;
    }






    return (
        <PageContext.Provider value={{currentPage, setCurrentPage} as PageContextProps}>
            <FilteredProductsContext.Provider value={{filteredProducts, setFilteredProducts} as FiltredProductsContextProps}>
                <div className="min-h-screen bg-black relative pb-5">
                    <div className="absolute inset-x-0 m-auto h-[500px] max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[220px]"></div>
                    <div className="h-[70px] bg-white/10 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 shadow-2xl border-b-black flex flex-nowrap items-center justify-between px-5">
                        <h1 className="font-bold text-xl brightness-100 text-[#ffba08] font-lilitaOne">Pyshop</h1>
                        <SearchInput onSearch={handleSearchInputChange} />
                        <IconContext.Provider value={{color:"white", size:"22"}}>
                            <FaGithub />
                        </IconContext.Provider>
                    </div>
                    <div className="flex flex-col flex-nowrap gap-y-3 items-center h-[100vh] px-72 text-center justify-center">
                        <h5 className="brightness-95 text-sm font-Inter text-[#ffba08]">Navigate products with ease</h5>
                        <h1 className="text-white text-5xl font-bold brightness-100">
                            Interact with several e-commerce products using <span className="text-[#ffba08]">Pyshop</span>
                        </h1>
                        <p className="text-white text-xs mt-5">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</p>
                        <button className="bg-gradient-to-r  from-[#ffba08] to-[#F48C06] text-white py-2 px-3.5 w-[140px] brightness-95 rounded-lg mt-5 hover:bg-gradient-to-l hover:brightness-105 flex flex-nowrap gap-x-1.5 items-center justify-center"
                                onClick={handleScroll}
                        >
                            <IconContext.Provider value={{size:"20"}}>
                                <IoNavigateCircleOutline />
                            </IconContext.Provider>
                            Explore
                        </button>
                    </div>
                    <section className="min-h-screen" ref={productsSectionRef} >
                        <div className="flex flex-col gap-y-5 h-full px-5">
                            <div className="h-20 flex flex-row gap-x-4 items-center">
                                <Button>Men</Button>
                                <Button>Women</Button>
                                <Button>Boys</Button>
                                <Button>Girls</Button>
                            </div>
                            <div className="w-[100%] flex flex-col  gap-y-20 items-center mb-10">
                                <div className="w-full h-full  rounded-2xl flex flex-wrap justify-center gap-3.5">
                                    {displayProducts()}
                                </div>
                                <Pagination total_pages={totalPages} />
                            </div>
                        </div>
                    </section>
                </div>
            </FilteredProductsContext.Provider>
        </PageContext.Provider>

  )
}

export default App
