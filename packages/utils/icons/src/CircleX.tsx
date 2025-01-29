import { IconSvgProps } from './types';

export const CircleX = (props: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);
