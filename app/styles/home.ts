import styled from "styled-components";

export const Home = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: -8rem;

    form {
        display: flex;
        box-shadow: 0 4px 7px #bbb;
        border-radius: .5rem;
        overflow: hidden;
        margin-top: 5rem;
        transition: all ease .2s;
        
        &:focus-within, &:hover {
            box-shadow: 0 4px 17px #bbb;
            transform: translateY(-.2rem);
        }

        input {
            border: none;
            padding: 2rem;
            width: 45rem;
            font-size: 1.8rem;
            outline: none;

            &::-webkit-search-cancel-button {
                cursor: pointer;
            }
        }

        button {
            cursor: pointer;
            border: none;
            background: orange;
            height: 100%;
            width: 6.7rem;
            aspect-ratio: 1/1;
            outline: none;
            transition: all ease .2s;

            &:focus, &:hover {
                box-shadow: 0 0 5px #888 inset;
            }
        }
    }
`;
