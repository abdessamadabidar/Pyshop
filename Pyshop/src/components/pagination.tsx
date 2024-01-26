
import { MouseEventHandler, useContext, useEffect } from 'react';
import './pagination.css'
import { PageContextProps, PageContext } from '../PageContext';

interface Props {
    total_pages: number;
}

export default function Pagination({total_pages} : Props) {


    const {currentPage, setCurrentPage} = useContext(PageContext) as PageContextProps
    const handlePageChange : MouseEventHandler<HTMLButtonElement> = (e) => {
        setCurrentPage(e.target.dataset.page)
        console.log(currentPage)
    }

    const incrementPages = (): void => {
        const buttons: NodeList = document.querySelectorAll('.pagination-button');
        buttons.forEach((b) => {
            if (b.firstChild) {
                const currentValue = parseInt(b.firstChild.dataset.page || undefined , 10);
                if (currentValue && currentValue < total_pages) {
                    const newValue = currentValue + 5;
                    b.firstChild.innerHTML = String(newValue);
                    b.firstChild.setAttribute('data-page', String(newValue));

                }
                
            }
        });
    };

    const decrementPages = (): void => {
        const buttons: NodeList = document.querySelectorAll('.pagination-button');
        buttons.forEach((b) => {
            if (b.firstChild) {
                const currentValue = parseInt(b.firstChild.dataset.page || undefined , 10);
                if (currentValue && currentValue > 5) {
                    const newValue = currentValue - 5;
                    b.firstChild.innerHTML = String(newValue);
                    b.firstChild.setAttribute('data-page', String(newValue));
                }
            
               
            }
        });
    };
    


    const handleNextButton = () => {
        incrementPages()
    }

    const handlePrevButton = () => {
        decrementPages()
    }


    useEffect(() => {
        const span = document.querySelector(`[data-page="${currentPage}"]`) as HTMLSpanElement | null;
        const listSpanNodes = document.querySelectorAll(`[data-page]:not([data-page="${currentPage}"])`) as NodeListOf<HTMLSpanElement>
        listSpanNodes.forEach(element => {
            const btn = element.parentNode as HTMLButtonElement | null;
            if (btn) {
                btn.style.backgroundColor = "transparent"
            }
        })

        if(span) {
            const btn = span?.parentNode as HTMLButtonElement | null;
            if(btn) {
                btn.style.backgroundColor = "#ffba08"
            }

        }
        
    }, [currentPage])

    return (
        <div className="flex items-center gap-4 ">
            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handlePrevButton}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                     aria-hidden="true" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Previous
            </button>
            <div className="flex items-center gap-2">
                <button onClick={handlePageChange} className="pagination-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-page="1">1</span>
                </button>
                <button onClick={handlePageChange} className="pagination-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-page="2">2</span>
                </button>
                <button onClick={handlePageChange} className="pagination-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full  text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-page="3">3</span>
                </button>
                <button onClick={handlePageChange} className="pagination-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center text-white align-middle font-sans text-xs font-medium uppercase text-whitetransition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-page="4">4</span>
                </button>
                <button onClick={handlePageChange} className="pagination-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-page="5">5</span>
                </button>
            </div>
            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleNextButton}
                >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                     aria-hidden="true" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
            </button>
        </div>
    );
}