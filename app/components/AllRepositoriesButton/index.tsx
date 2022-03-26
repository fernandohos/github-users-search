import { useRouter } from "next/router";
import React from "react";
import * as C from "./styles";

export function AllRepositoriesButton() {
    const router = useRouter();

    function handleClick() {
        router.push(`/${router.query.user}/repositories`);
    }

    return <C.Button onClick={handleClick}>All Repositories</C.Button>;
}
