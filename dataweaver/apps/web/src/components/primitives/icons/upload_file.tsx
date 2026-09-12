import type { ComponentPropsWithRef } from 'react';

export const IconUploadFile = (props: ComponentPropsWithRef<'svg'>) => {
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
        d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63V-200ZM240-80q-33 0-57-24T160-160v-640q0-33 24-57T240-880h320l240 240v480q0 33-24 57T720-80H240ZM520-600V-800H240v640h480V-600H520Z"
      />
    </svg>
  );
};
