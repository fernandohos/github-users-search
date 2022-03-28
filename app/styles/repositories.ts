import styled from "styled-components";

export const Repositories = styled.div`
    width: 88%;
    margin: 3rem auto;
`;

export const RepositoriesGrid = styled.main`
    margin-top: 2rem;
    display: grid;
    grid-auto-rows: 1fr;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 710px) {
        grid-template-columns: 1fr;
    }
`;
