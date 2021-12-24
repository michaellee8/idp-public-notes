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

---
# Basic vs Advanced

Advanced topic will be discussed at https://advanced.idp.michaellee8.com. Lots of very useful but not essential stuffs there.

- Some suggestions given in basic slides are only good for the scope of this course since the codebase is rather simple, or have limitations.
- Will have better or more correct way discussed in advanced.
- Those suggestions will be tagged with :star:.

---
# Arduino's programming model

[![bg left:25% 60%](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzZXR1cFtzZXR1cF1cbiAgICBsb29wW2xvb3BdXG5cbiAgICBzZXR1cCAtLT4gbG9vcFxuICAgIGxvb3AgLS0-IGxvb3BcbiAgIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/edit#eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzZXR1cFtzZXR1cF1cbiAgICBsb29wW2xvb3BdXG5cbiAgICBzZXR1cCAtLT4gbG9vcFxuICAgIGxvb3AgLS0-IGxvb3BcbiAgIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

- Perform setup like initializing sensors, motors and serial in `setup()` once only.
- Program in `loop()` will be executed forever, use it to implement your own program logic and recurring tasks like reading values.
- Share variables between `setup()` and `loop()` by making them global variable. :star:

---
# Basic code organization

- Seperate big trunks of code for different tasks into different functions.
- Use global variables for sharing data between functions. :star:
- Define constants for hard-coded numbers used in the program, don't put them directly code, for easier tuning later.
- Log sensor values, program state and motor output for easier debugging.
-  Write verbosive comments when you think you need it. More is better.
---
Seperating tasks

---
```cpp
void readUltrasonicSensorValues(){
  // Read sensor values here
}

void readSerialInput(){
  // Read serial input here
}

void determineWhatToDo(){
  // Run program logic here.
}

void loop(){
  readUltrasonicSensorValues();
  readSerialInput();
  determineWhatToDo();
}
```

---
Global variables and Constants

---
```cpp
const float STOP_SENSOR_DISTANCE = 20.0;
const int MOTOR_PIN = A4;

float sensorDistance;
bool shouldContinue;
int motorSpeed;

void readUltrasonicSensorValues(){
  // processing
  sensorDistance = xxx;
}

void readSerialInput(){
  // processing
  shouldContinue = xxx;
}
```
---
```cpp
void determineWhatToDo(){
  if (sensorDistance <= STOP_SENSOR_DISTANCE && shouldContinue){
    motorSpeed = 100;
  }else{
    motorSpeed = 0;
  }
}

void writeMotorSpeed(){
  analogWrite(MOTOR_PIN, motorSpeed);
}

void loop(){
  readUltrasonicSensorValues();
  readSerialInput();
  determineWhatToDo();
  writeMotorSpeed();
  writeLogToSerial();
}
```
---
```cpp
const float STOP_SENSOR_DISTANCE = 20.0;
const float RUN_SENSOR_DISTANCE = 60.0;

float sensorDistance;
bool shouldContinue;
int motorSpeed;

ProgramState currentState;

enum class ProgramState : char { // Only integral type like int or char is allowed because of C++ limitations
  RUNNING = "R",
  MOVING = "M",
  TOO_CLOSE = "C",
  STOPPED_BY_SERIAL = "S"
};
```

---
```cpp
void determineWhatToDo(){
  if (!shouldContinue){
    motorSpeed = 0;
    currentState = ProgramState::STOPPED_BY_SERIAL;
    return;
  }
}

void writeLogToSerial(){
  // Log current program state to serial input here.
}

void loop(){
  readUltrasonicSensorValues();
  readSerialInput();
  determineWhatToDo();
  writeLogToSerial();
}
```
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