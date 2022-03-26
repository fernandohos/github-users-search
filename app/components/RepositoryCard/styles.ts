import styled from "styled-components";

export const RepositoryCard = styled.div`
    border-radius: 1rem;
    border: 2px solid orange;
    min-width: 0;
    height: auto;
    display: flex;
    flex-direction: column;

    .info-wrapper {
        padding: 1rem;
        height: 100%;
    }

    .name {
        font-size: 2rem;
        font-weight: 500;
        color: #000;
        text-decoration: none;
    }

    .description {
        font-size: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #777;
    }

    a {
        color: #10a5f5;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .created {
        font-size: 1.5;
        color: #999;
    }

    .stars-forks {
        display: grid;
        margin-top: auto;
        grid-template-columns: 2rem max-content 2rem max-content;
        grid-gap: 1rem;
    }

    .languages {
        height: 2rem;
        display: flex;
        align-items: flex-end;
    }
`;

export const Language = styled.div<{ color: string; size: number }>`
    position: relative;
    transition: all ease 0.2s;
    height: 60%;

    &:last-child {
        border-bottom-right-radius: 1rem;
    }

    &:first-child {
        border-bottom-left-radius: 1rem;
    }

    &:hover {
        height: 100%;

        > p {
            opacity: 1;
        }
    }

    > p {
        transition: all ease 0.2s;
        position: absolute;
        width: max-content;
        background: white;
        padding: 0.1rem 0.2rem;
        border: 1px solid #bbb;
        opacity: 0;
        top: -2.5rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.3rem;
    }
    background: ${({ color }) => color};
    width: ${({ size }) => `${size}%`};
`;
