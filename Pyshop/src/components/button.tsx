interface Props {
    children: string;
}
export default function Button({children}: Props) {
    return (
        <button className="rounded-full bg-white/10 backdrop-blur-sm py-1.5 px-4 text-center text-sm text-white hover:scale-105 transition-all duration-200 whitespace-nowrap focus:bg-[#ffba08]">{children}</button>
    );
}