import React from "react";
import * as C from "./styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
    return <C.Button {...rest}>{children}</C.Button>;
}