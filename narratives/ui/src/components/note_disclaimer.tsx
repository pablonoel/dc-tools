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
 * @fileoverview Renders the AI-generated-content disclaimer note.
 */

import { GeminiInfoIcon } from './icons';

/**
 * Figma node 3427-16777 "Disclaimer" → 3427-16778 "DisclaimerNote".
 * Thin divider + info icon + body text.
 * Token "ts5" (the \_ space character) maps to color #F9F9F9, used only
 * inside the text — we collapse it back to a regular space.
 */

interface DisclaimerNoteProps {
  text?: string;
}

/**
 * The approved AI-content wording. Exported because the composer footer in
 * data_agent.tsx shows the same disclaimer — when the two were separate
 * literals one of them was updated and the other was not.
 */
export const DISCLAIMER_TEXT =
  'Data Commons by Google. Data overviews are synthesized by Gemini. Gemini is AI and can make mistakes; please verify content against primary source data.';

/** Small AI-generated-content disclaimer shown under each answer. */
export function DisclaimerNote({
  text = DISCLAIMER_TEXT,
}: DisclaimerNoteProps) {
  return (
    <section
      className="flex flex-col gap-1.5 self-stretch"
      aria-label="Disclaimer"
    >
      <hr className="border-border" />
      <div className="flex items-start gap-2.5 pt-2.5">
        <GeminiInfoIcon size="xs" className="mt-1" />
        <p className="m-0 text-body-large text-note">{text}</p>
      </div>
    </section>
  );
}
