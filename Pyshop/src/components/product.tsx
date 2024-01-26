
type Product =  {
    Category: string,
    Colour: string,
    Gender: string,
    Image: string,
    ImageURL: string,
    ProductId: number,
    ProductTitle: string,
    ProductType: string,
    SubCategory: string,
    Usage: string
}

interface Props {
    product: Product;
}
export default function Product({product} : Props) {
    return (
        <div className="relative flex flex-col text-gray-700 bg-white/25 backdrop-blur-[220px] shadow-md bg-clip-border rounded-xl w-[250px] h-[380px] transition-all duration-300 hover:scale-105">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-[200px]">
                <img
                    // src={`/dataset/products/${product.Image}`}
                    src={product.ImageURL}
                    alt="card-image" className="object-contain w-full h-full" />
            </div>
            <div className="h-[30%]">
                <div className="px-6 py-4">
                    <p className="block antialiased font-medium leading-relaxed h-[40px] overflow-hidden text-white text-xs">
                        {product.ProductTitle}
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="block font-sans text-xs antialiased font-normal leading-normal text-white opacity-75">
                            {product.Category} - {product.SubCategory}
                        </p>
                        <p className="block text-sm antialiased font-normal leading-normal text-white/80">
                            {product.Gender}
                        </p>
                    </div>

                </div>
                <div className="px-6 py-4 pt-0 ">
                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-[#ffba08]/80 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        type="button">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export type {Product}