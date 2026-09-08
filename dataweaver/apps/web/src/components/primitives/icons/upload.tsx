import type { ComponentPropsWithRef } from 'react';

export const IconUpload = (props: ComponentPropsWithRef<'svg'>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M11 16V7.85L8.4 10.45 7 9l5-5 5 5-1.4 1.45-2.6-2.6V16ZM6 20q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
      />
    </svg>
  );
};
