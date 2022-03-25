import React, { useState } from "react";
import * as C from "./styles";
import Image from "next/image";
import searchIcon from "@images/search.svg";
import { useRouter } from "next/router";

export function Header() {
    const router = useRouter();
    const [githubName, setGithubName] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/${githubName}`);
    }
    return (
        <C.Header>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    value={githubName}
                    onChange={(e) => setGithubName(e.target.value)}
                    placeholder="search a github user..."
                />
                <button>
                    <Image
                        src={searchIcon}
                        width={30}
                        height={30}
                        alt="search icon"
                    />
                </button>
            </form>
        </C.Header>
    );
}
