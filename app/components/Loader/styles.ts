import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
`;

export const Loader = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    animation: ${rotate} 2s linear infinite;
    border: 3px solid;
    border-color: orange transparent orange transparent;
`;
