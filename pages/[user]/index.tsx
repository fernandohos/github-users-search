import React from "react";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import * as C from "@styles/user";
import work from "@images/work.svg";
import email from "@images/email.svg";
import location from "@images/location.svg";
import { RepositoryCard } from "@components/RepositoryCard";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { useRouter } from "next/router";
import Link from "next/link";

const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
        Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_KEY}`,
    },
});

type UserPageProps = {
    user: {
        name: string;
        avatarUrl: string;
        bio: string;
        login: string;
        email: string;
        company: string;
        location: string;
        url: string;
        followers: {
            totalCount: number;
        };
        following: {
            totalCount: number;
        };
        pinnedItems: {
            totalCount: number;
            nodes: {
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
            }[];
        };
    };
};

export default function User({ user }: UserPageProps) {
    const router = useRouter();

    return (
        <C.UserHome>
            <Header />
            <C.Content>
                <div className="user-content">
                    <div className="user-info-wrapper">
                        <div className="image-container">
                            <Image
                                src={user.avatarUrl}
                                alt={`${user.name} github profile picture`}
                                width={220}
                                height={220}
                            />
                        </div>
                        <div className="user-info">
                            <h1>{user.name}</h1>
                            <p className="login">{user.login}</p>
                            <p className="bio">{user.bio}</p>
                            <div className="user-info-details">
                                {user.email && (
                                    <>
                                        <Image
                                            src={email}
                                            alt="email icon"
                                            width={25}
                                            height={25}
                                        />
                                        <p title={user.email} className="email">
                                            {user.email}
                                        </p>
                                    </>
                                )}
                                {user.company && (
                                    <>
                                        <Image
                                            src={work}
                                            alt="work icon"
                                            width={25}
                                            height={25}
                                        />
                                        <p>{user.company}</p>
                                    </>
                                )}
                                {user.location && (
                                    <>
                                        <Image
                                            src={location}
                                            alt="email icon"
                                            width={25}
                                            height={25}
                                        />
                                        <p>{user.location}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="followers-content">
                        <div>
                            <div>
                                <p>Followers</p>
                                <p>{user.followers.totalCount}</p>
                            </div>
                            <div>
                                <p>Following</p>
                                <p>{user.following.totalCount}</p>
                            </div>
                        </div>
                        <a href={user.url} target="_blank" rel="noreferrer">
                            <span>
                                Visit {user.name.split(" ")[0]} on{" "}
                                <strong>GitHub</strong>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="repositories-content">
                    <p>
                        Pinned Repositories &#40;{user.pinnedItems.totalCount}
                        &#41;
                    </p>
                    {user.pinnedItems.totalCount ? (
                        <div className="repositories-grid">
                            {user.pinnedItems.nodes.map((repository) => {
                                return (
                                    <RepositoryCard
                                        key={repository.databaseId}
                                        {...repository}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-repos">
                            <a
                                href="https://octodex.github.com/octobiwan/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image
                                    src="https://octodex.github.com/images/octobiwan.jpg"
                                    alt="Octobi Wan Catnobi"
                                    height={150}
                                    width={150}
                                />
                            </a>
                            <p>this user does not have any pinned repository</p>
                        </div>
                    )}
                </div>
            </C.Content>
            <Button
                onClick={() => {
                    router.push(`/${user.login}/repositories`);
                    console.log("logou");
                }}
            >
                All repositories
            </Button>
        </C.UserHome>
    );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    const { user } = query;

    const userQuery = gql`
        query GetUserInfo($login: String!) {
            user(login: $login) {
                name
                bio
                login
                avatarUrl
                location
                email
                company
                url
                followers {
                    totalCount
                }
                following {
                    totalCount
                }
                pinnedItems(first: 6) {
                    totalCount
                    nodes {
                        ... on Repository {
                            databaseId
                            name
                            description
                            url
                            createdAt
                            homepageUrl
                            forkCount
                            forkingAllowed
                            stargazerCount
                            languages(first: 6) {
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

    const data = await client.request(userQuery, { login: user });

    return {
        props: { ...data },
    };
}
