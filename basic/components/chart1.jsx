import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import React from "react";
import { mermaidConfig } from "../../themes/const";

const content = `
graph TD
    setup[setup]
    loop[loop]
    setup --> loop
    loop --> loop
`;

export const Chart1 = () => <Mermaid chart={content} config={mermaidConfig} />;
