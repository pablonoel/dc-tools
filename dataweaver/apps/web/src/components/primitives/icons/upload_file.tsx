import type { ComponentPropsWithRef } from 'react';

export const IconUploadFile = (props: ComponentPropsWithRef<'svg'>) => {
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
        d="M11 19h2v-4.175l1.6 1.6 1.4-1.425-4-4-4 4 1.425 1.4 1.575-1.575V19ZM6 22q-.825 0-1.413-.588T4 20v-16q0-.825.588-1.413T6 2h8l6 6v12q0 .825-.588 1.413T18 22H6ZM13 9V4H6v16h12V9H13Z"
      />
    </svg>
  );
};
