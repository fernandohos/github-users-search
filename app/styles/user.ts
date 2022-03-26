import styled from "styled-components";

export const UserHome = styled.div`
    form {
        width: 50rem;
        display: flex;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 4px 7px #bbb;
        transition: all ease 0.2s;

        &:focus-within,
        &:hover {
            box-shadow: 0 4px 17px #bbb;
            transform: translateY(-0.2rem);
        }

        input {
            flex: 1;
            height: 4rem;
            border: none;
            padding-left: 1rem;
            font-size: 1.8rem;
            outline: none;
            &::-webkit-search-cancel-button {
                cursor: pointer;
            }
        }

        button {
            aspect-ratio: 1/1;
            display: flex;
            padding: 0.5rem;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            background: orange;
            outline: none;
            transition: all ease 0.2s;

            &:focus,
            &:hover {
                box-shadow: 0 0 5px #888 inset;
            }
        }
    }
`;

export const Content = styled.main`
    .user-content {
        display: flex;
        width: 100%;
        width: 88%;
        margin: 4rem auto;

        @media (max-width: 800px) {
            flex-direction: column;
        }

        
        .user-info-wrapper {
            display: flex;
            @media (max-width: 500px) {
                flex-direction: column;

                .user-info {
                    margin: 2rem 0;
                }
            }
        }

        .image-container {
            border: 3px solid orange;
            border-radius: 1rem;
            overflow: hidden;
            font-size: 0;
            width: 22rem;
            min-width: 22rem;
            height: 22rem;

            @media (max-width: 500px) {
                margin: auto;
            }
        }

        .user-info {
            margin-left: 2rem;
            min-width: 0;

            h1 {
                font-size: 2.3rem;
            }

            .login {
                color: #888;
            }

            .bio {
                max-height: 5.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .user-info-details {
                opacity: 0.6;
                margin-top: 1rem;
                display: grid;
                grid-template-columns: 2.5rem 1fr;
                gap: 1rem;
                min-width: 0;

                .email {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .followers-content {
            margin-left: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            @media (max-width: 800px) {
                flex-direction: row;
                margin: 2rem 0;
            }

            @media(max-width: 500px) {
                margin: 0;
                a {
                    margin-left: 1rem;
                }
            }

            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;

                > div {
                    text-align: center;
                    padding: 0 0.5rem;
                    border: 1px solid #bbb;
                    border-radius: 0.5rem;
                }
            }
            a {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: #24292f;
                background: #f7f8fa;
                border-radius: 0.6rem;
                border: 1px solid rgba(27, 31, 36, 0.15);
                padding: 0.5rem 1rem;
                line-height: 2rem;
                text-decoration: none;
            }
        }
    }
`;
