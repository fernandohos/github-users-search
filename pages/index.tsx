import React from "react";
import * as C from "@styles/home";
import Image from "next/image";
import searchIcon from "@images/search.svg";

export default function Home() {
  return (
    <C.Home>
      <a
        href="https://octodex.github.com/images/inspectocat.jpg"
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
      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder="search a github user..." type="search" />
        <button>
          <Image src={searchIcon} width={30} height={30} alt="search icon" />
        </button>
      </form>
    </C.Home>
  );
}
