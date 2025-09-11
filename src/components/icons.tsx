import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="24"
      height="24"
      {...props}
    >
      <path d="M7 15h10" />
      <path d="M12 3v18" />
      <path d="M10 3L7.24 7.91" />
      <path d="M14 3l2.76 4.91" />
    </svg>
  );
}
