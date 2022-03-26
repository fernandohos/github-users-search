import styled from "styled-components";

export const Header = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 4rem;
    border-bottom: 1px solid #eee;

    form {
        width: 50rem;
        display: flex;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 2px 7px #ddd;
        transition: all ease 0.2s;

        &:focus-within,
        &:hover {
            box-shadow: 0 3px 12px #ccc;
            transform: translateY(-0.2rem);
        }

        input {
            width: 100%;
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
            min-width: 4rem;
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
