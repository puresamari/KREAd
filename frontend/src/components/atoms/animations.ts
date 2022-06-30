import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;
export const slideUpOpacity = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0,20%,0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;
