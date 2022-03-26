import React from "react";
import * as C from "@styles/user";
import { Header } from "app/components/Header";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import work from "@images/work.svg";
import email from "@images/email.svg";
import location from "@images/location.svg";

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
    };
};

export default function User({ user }: UserPageProps) {
    console.log(user);
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
                        <a href={user.url}>
                            <span>
                                Visit {user.name.split(" ")[0]} on{" "}
                                <strong>GitHub</strong>
                            </span>
                        </a>
                    </div>
                </div>
            </C.Content>
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
            }
        }
    `;

    const data = await client.request(userQuery, { login: user });

    return {
        props: { ...data },
    };
}
