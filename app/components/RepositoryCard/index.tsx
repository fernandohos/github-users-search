import React from "react";
import * as C from "./styles";
import Image from "next/image";
import star from "@images/star.svg";
import fork from "@images/fork.svg";

type RepositoryCardType = {
    name: string;
    description: string;
    url: string;
    createdAt: string;
    databaseId: number;
    homepageUrl: string;
    forkCount: number;
    forkingAllowed: boolean;
    stargazerCount: number;
    languages: {
        totalSize: number;
        totalCount: number;
        edges: {
            size: number;
        }[];
        nodes: {
            color: string;
            name: string;
        }[];
    };
};

export function RepositoryCard(props: RepositoryCardType) {
    return (
        <C.RepositoryCard>
            <div className="info-wrapper">
                <a
                    href={props.url}
                    target="_blank"
                    className="name"
                    rel="noreferrer"
                >
                    {props.name}
                </a>
                {props.description && (
                    <p className="description">{props.description}</p>
                )}
                {props.homepageUrl && (
                    <p>
                        visit:{" "}
                        <a href={props.homepageUrl}>
                            {props.homepageUrl.split("//")[1]}
                        </a>
                    </p>
                )}
                <p className="created">
                    created: {new Date(props.createdAt).toLocaleDateString()}
                </p>
                <div className="stars-forks">
                    {!!props.stargazerCount && (
                        <>
                            <Image
                                src={star}
                                alt="star icon"
                                width={20}
                                height={20}
                                title="stars"
                            />
                            <p title="stars">{props.stargazerCount}</p>
                        </>
                    )}
                    {props.forkingAllowed && !!props.forkCount && (
                        <>
                            <Image
                                src={fork}
                                alt="fork icon"
                                width={20}
                                height={20}
                                title="forks"
                            />
                            <p title="forks">{props.forkCount}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="languages">
                {props.languages.nodes.map((language, i) => {
                    const languagePercentage =
                        (props.languages.edges[i].size * 100) /
                        props.languages.totalSize;
                    return languagePercentage > 5 ? (
                        <C.Language
                            color={language.color}
                            key={i}
                            size={languagePercentage}
                        >
                            <p>
                                {language.name} {languagePercentage.toFixed(2)}%
                            </p>
                        </C.Language>
                    ) : (
                        <></>
                    );
                })}
                {(function () {
                    const otherPercentage =
                        (props.languages.edges.reduce(
                            (previousValue, currentValue) => {
                                if (
                                    (currentValue.size * 100) /
                                        props.languages.totalSize <
                                    5
                                ) {
                                    return previousValue + currentValue.size;
                                } else {
                                    return previousValue;
                                }
                            },
                            0
                        ) *
                            100) /
                        props.languages.totalSize;
                    return !!otherPercentage ? (
                        <C.Language color="#ddd" size={otherPercentage}>
                            <p>Other {otherPercentage.toFixed(2)}%</p>
                        </C.Language>
                    ) : null;
                })()}
            </div>
        </C.RepositoryCard>
    );
}
