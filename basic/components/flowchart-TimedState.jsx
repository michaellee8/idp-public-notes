flowchart TD
    A((Start)) --> B{Is button on?}
    B -- Yes--> C[led-should-blink.isInside]
    B -- No --> D[LED off]
    C -- Yes --> E[LED on]
    C -- No --> D
  