flowchart TD
    A[Start] --> B{Is button on?}
    B -- Yes--> C[currentMillis / Interval % 2 == 0]
    B -- No --> D[LED off]
    C -- Yes --> E[LED on]
    C -- No --> D