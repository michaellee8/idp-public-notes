import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import React from "react";
import { mermaidConfig } from "../../themes/const";

const content = `
flowchart TD
    A((Start)) --> B{Is button on?}
    B -- Yes--> C[led-should-blink.isInside]
    B -- No --> D[LED off]
    C -- Yes --> E[LED on]
    C -- No --> D

    `;

export const Chart3 = () => <Mermaid chart={content} config={mermaidConfig} />;