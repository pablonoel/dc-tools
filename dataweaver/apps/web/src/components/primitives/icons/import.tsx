import type { ComponentPropsWithRef } from 'react';

export const IconImport = (props: ComponentPropsWithRef<'svg'>) => {
  return (
    <svg
      {...props}
      viewBox="0 -960 960 960"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M400-280v-60h280v-280H400v-60h280q24 0 42 18t18 42v280q0 24-18 42t-42 18H400Zm-80-113-43-43 120-120H120v-60h277L277-736l43-43 193 193-193 193Z"
      />
    </svg>
  );
};
