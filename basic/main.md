---
marp: true
theme: gaia
_class: lead
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---
# Introduction to basic Arduino programming techniques

https://basic.idp.michaellee8.com

Source code: https://github.com/michaellee8/idp-public-notes

---
<!-- paginate: true -->

# Assumptions

- Expecting understanding to programming of a yr3 or yr4 CE student or equivalent.
- Has basic understanding to C++.
- Has basic concepts to Arduino hardware.
- Has learnt basic interaction with Arduino sensors.

---
# Topics

- Arduino's programming model
- Basic code organization and conventions
- Sampling
- Non-blocking control (no `delay()`)
- Precise motor control
- Basic debugging skills

Advanced topic will be discussed at https://advanced.idp.michaellee8.com. Lots of very useful but not essential stuffs there.

---
# Arduino's programming model

[![bg left:25% 60%](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzZXR1cFtzZXR1cF1cbiAgICBsb29wW2xvb3BdXG5cbiAgICBzZXR1cCAtLT4gbG9vcFxuICAgIGxvb3AgLS0-IGxvb3BcbiAgIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/edit#eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzZXR1cFtzZXR1cF1cbiAgICBsb29wW2xvb3BdXG5cbiAgICBzZXR1cCAtLT4gbG9vcFxuICAgIGxvb3AgLS0-IGxvb3BcbiAgIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

- Perform setup like initializing sensors, motors and serial in `setup()` once only.
- Program in `loop()` will be executed forever, use it to implement your own program logic and recurring tasks like reading values.
- Share variables between `setup()` and `loop()` by making them global variable. (Better way will be introduced in advanced)



---

![bg left:40% 80%](https://marp.app/assets/marp.svg)

# **Marp**

Markdown Presentation Ecosystem

https://marp.app/

---

# How to write slides

Split pages by horizontal ruler (`---`). It's very simple! :satisfied:

```markdown
# Slide 1

foobar

---

# Slide 2

foobar
```