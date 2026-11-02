/**
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * @fileoverview Renders a button that exports the answer panel to PDF via the browser print flow.
 */

import { useRef } from 'react';
import { ExportIcon } from './icons';
import { Tooltip } from './tooltip';

interface ExportPdfButtonProps {
  onExport: () => void;
  busy?: boolean;
  label?: string;
}

/** Tonal "Export PDF" pill that prints the enclosing answer panel to PDF. */
export function ExportPdfButton({
  onExport,
  busy = false,
  label = 'Export PDF',
}: ExportPdfButtonProps) {
  const internalRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center h-12" data-non-print="true">
      <Tooltip label="Download this answer as a PDF">
        <button
          ref={internalRef}
          type="button"
          onClick={onExport}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-theme-container text-on-theme-container text-label-large cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
        >
          <ExportIcon />
          <span>{busy ? 'Preparing…' : label}</span>
        </button>
      </Tooltip>
    </div>
  );
}
