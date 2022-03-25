import React, { useState } from "react";
import * as C from "@styles/home";
import Image from "next/image";
import searchIcon from "@images/search.svg";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const [githubName, setGithubName] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/${githubName}`);
    }

    return (
        <C.Home>
            <a
                href="https://octodex.github.com/inspectocat/"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    width={220}
                    height={220}
                    src="https://octodex.github.com/images/inspectocat.jpg"
                    title="octodex inspectocat"
                    alt="octodex inspectocat"
                />
            </a>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="search a github user..."
                    value={githubName}
                    onChange={(e) => setGithubName(e.target.value)}
                    type="search"
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
        </C.Home>
    );
}
