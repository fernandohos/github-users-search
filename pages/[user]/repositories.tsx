import React, { useState } from "react";
import * as C from "@styles/repositories";
import { Header } from "@components/Header";
import { GetServerSidePropsContext } from "next";
import { gql, GraphQLClient } from "graphql-request";
import { RepositoryCard } from "@components/RepositoryCard";
import { Button } from "@components/Button";
import { useRouter } from "next/router";
import { Loader } from "@components/Loader";
import Link from "next/link";

const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
        Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_KEY}`,
    },
});

type RepositoriesPageProps = {
    name: string;
    login: string;
    repositories: {
        totalCount: number;
        edges: {
            cursor: string;
            node: {
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
        }[];
    };
};

export default function Repositories({
    repositories: { edges, totalCount },
    name,
    login,
}: RepositoriesPageProps) {
    const [repositories, setRepositories] = useState(edges);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function loadMore() {
        setLoading(true);
        const repositoriesQuery = gql`
            query GetRepositories($login: String!, $lastCursor: String!) {
                user(login: $login) {
                    repositories(first: 12, after: $lastCursor) {
                        edges {
                            cursor
                            node {
                                name
                                description
                                url
                                createdAt
                                databaseId
                                homepageUrl
                                forkCount
                                forkingAllowed
                                stargazerCount
                                languages(first: 10) {
                                    totalSize
                                    totalCount
                                    edges {
                                        size
                                    }
                                    nodes {
                                        color
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        const { user } = await client.request(repositoriesQuery, {
            login: router.query.user,
            lastCursor: repositories[repositories.length - 1].cursor,
        });
        setRepositories((p) => [...p, ...user.repositories.edges]);
        setLoading(false);
    }

    return (
        <>
            <Header />
            <C.Repositories>
                <h1>
                    {name}{" "}
                    <Link href={`/${login}`} passHref>
                        <span>/{login}</span>
                    </Link>
                </h1>
                <C.RepositoriesGrid>
                    {repositories.map((edge) => {
                        return (
                            <RepositoryCard {...edge.node} key={edge.cursor} />
                        );
                    })}
                </C.RepositoriesGrid>
                {totalCount !== repositories.length && (
                    <Button onClick={loadMore}>
                        {loading ? <Loader /> : "Load more"}
                    </Button>
                )}
            </C.Repositories>
        </>
    );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    const repositoriesQuery = gql`
        query GetRepositories($login: String!) {
            user(login: $login) {
                name
                login
                repositories(first: 12) {
                    totalCount
                    edges {
                        cursor
                        node {
                            name
                            description
                            url
                            createdAt
                            databaseId
                            homepageUrl
                            forkCount
                            forkingAllowed
                            stargazerCount
                            languages(first: 10) {
                                totalSize
                                totalCount
                                edges {
                                    size
                                }
                                nodes {
                                    color
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const { user } = await client.request(repositoriesQuery, {
        login: query.user,
    });

    return {
        props: {
            ...user,
        },
    };
}
