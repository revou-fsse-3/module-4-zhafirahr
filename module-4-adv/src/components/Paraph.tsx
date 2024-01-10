import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement>{
    children: string;
}

const Paraph = ({children, ...props }: Props) =>{
    return(
        <>
        <p {...props}>{children}</p>
        </>
    )
}

export default Paraph
