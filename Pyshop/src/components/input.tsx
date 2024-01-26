import { Input } from "@material-tailwind/react";
import {IconContext} from "react-icons";
import {CiSearch} from "react-icons/ci";
import {UploadImage} from "./uploadImage.tsx";

interface Props {
    onSearch: (value: string) => void;
}

export function SearchInput({onSearch} : Props) {
    return (
        <div className="w-[40%] border flex flex-nowrap items-center h-10 px-2.5 rounded-full ">
            <IconContext.Provider value={{className:"text-[#eeeeee]"}}>
                <CiSearch />
            </IconContext.Provider>
            <Input
                type="email"
                placeholder="search product"
                className=" bg-transparent !border-0 text-white"
                labelProps={{
                    className: "hidden",
                }}
                onInput={(e) => {onSearch(e.currentTarget.value)}}
                containerProps={{className: "min-w-[100px]"}} crossOrigin={undefined}            />
            <UploadImage />
        </div>
    );
}