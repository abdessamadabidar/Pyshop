import React, {FormEvent, useContext, useEffect, useRef, useState} from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody, DialogFooter,

} from "@material-tailwind/react";
import {IconContext} from "react-icons";
import {IoCameraOutline, IoCloseOutline} from "react-icons/io5";
import axios from "axios";
import { FilteredProductsContext, FiltredProductsContextProps } from "../FiltredProductsContext";

export function UploadImage() {
    const [open, setOpen] = React.useState(false);
    const [productImageFileURL, setProductImageFileURL] = useState('');
    const [productImageFile, setProductImageFile] = useState<File | null>(null);

    const productImageRef = useRef<HTMLInputElement | null>(null);
    const handleOpen = () => setOpen(!open);
    const {filteredProducts, setFilteredProducts} = useContext(FilteredProductsContext) as FiltredProductsContextProps;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData();
        if (productImageFile) {
            formData.append('imageFile', productImageFile)
        }
        


        const response = await axios.post(`http://localhost:5000/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.status == 200) {
            console.log(response)
            setFilteredProducts(response.data.similar_products)

        }
        else console.error('Failed to upload file to Flask.');
      
    }

    const handleProductImageChange = () : void => {
        const file : File | undefined   = productImageRef.current?.files?.[0];
        if (file) {
            setProductImageFile(file || null)
            const url : string = URL.createObjectURL(file);
            setProductImageFileURL(url)
        }
    }

    useEffect(() => {
        open || setProductImageFileURL('')
    }, [open]);

    return (
        <>
            <div onClick={handleOpen}>
                <IconContext.Provider value={{color:"white", size:"24", className: "cursor-pointer hover:scale-105"}}>
                    <IoCameraOutline />
                </IconContext.Provider>
            </div>
            <Dialog open={open}  placeholder={undefined} className="bg-black backdrop-blur-[220px]">
                <form onSubmit={handleSubmit}  encType="multipart/form-data">
                    <DialogHeader  placeholder={undefined} className="justify-end">
                        <div onClick={handleOpen}>
                            <IconContext.Provider value={{color:"white", className:"cursor-pointer hover:scale-95"}}>
                                <IoCloseOutline />
                            </IconContext.Provider>
                        </div>
                    </DialogHeader>
                    <DialogBody placeholder={undefined}   >
                        <div className=" flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-black/50 backdrop-blur-lg dark:hover:bg-black/50 dark:bg-black/50 hover:bg-black/40 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                {productImageFileURL ? <img src={productImageFileURL} className="h-[252px] w-100 z-50 object-cover" alt={""}/> :
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                }

                                <input id="dropzone-file" type="file" className="hidden"  name="productImage" onChange={handleProductImageChange} ref={productImageRef}/>
                            </label>
                        </div>
                    </DialogBody>
                    <DialogFooter placeholder={undefined}>
                        <button type="submit" className="rounded-lg bg-white/10 backdrop-blur-sm py-1.5 px-4 w-[120px] text-center text-white whitespace-nowrap">upload</button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}