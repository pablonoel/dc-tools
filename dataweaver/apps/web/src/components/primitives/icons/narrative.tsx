import type { ComponentPropsWithRef } from 'react';

export const IconNarrative = (props: ComponentPropsWithRef<'svg'>) => {
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
        d="M80-80v-80h480v80H80Zm0-200v-80h720v80H80Zm0-200v-80h440v80H80Zm620-40c-4 0-6.68-2-8-6a223.56 223.56 0 0 0-61-105A223.52 223.52 0 0 0 526-692c-4-1.32-6-4-6-8 0-4.68 2-7.32 6-8a227.4 227.4 0 0 0 105-60A230 230 0 0 0 692-874c1.32-4 4-6 8-6 4.68 0 7.32 2 8 6a242.24 242.24 0 0 0 61 106 227.4 227.4 0 0 0 105 60c4 0.68 6 3.32 6 8 0 4-2 6.68-6 8a230 230 0 0 0-106 61 227.44 227.44 0 0 0-60 105c-0.68 4-3.32 6-8 6Z"
      />
    </svg>
  );
};
