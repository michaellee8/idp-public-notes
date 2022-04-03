import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import React from "react";
import { mermaidConfig } from "../../themes/const";

const content = `
graph LR
    ReadValue[\Read sensor value\]
    Delay1[Pause for 1 second]
    Delay2[Pause for 1 second]
    TurnOn[\Turn on LED\]
    TurnOff[\Turn off LED\]
    IsPressed{Is button pressed?}

    ReadValue --> Delay1
    Delay1 --> TurnOff
    TurnOff --> IsPressed
    IsPressed -- Yes --> Delay2
    Delay2 --> TurnOn
    IsPressed -- No --> ReadValue
    TurnOn --> ReadValue
`;

export const Chart2 = () => <Mermaid chart={content} config={mermaidConfig} />;
