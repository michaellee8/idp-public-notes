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
- Write verbosive comments when you think you need it. More is better.

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
Program state and logging

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

void writeLogToSerial(){
  // Log current program state to serial input here.
  // Note that Serial output can block if the output buffer is full! Will introduce some techniques to deal with it later.
  // Fow now we only write if the buffer is not full. If the buffer is not full but still doesn't have enough space it still blocks.
  if (Serial.availableForWrite() > 0){
    Serial.print(',');
    Serial.print(motorSpeed);
    Serial.print(currentState);
    Serial.print(',');
    Serial.print(motorSpeed);
    Serial.print(',');
    Serial.print(sensorDistance);
    Serial.print(',');
    Serial.print(shouldContinue);
    Serial.println();
  }
}

```

---

```cpp
void determineWhatToDo(){
  if (!shouldContinue){
    motorSpeed = 0;
    currentState = ProgramState::STOPPED_BY_SERIAL;
    return;
  }
  if (sensorDistance > RUN_SENSOR_DISTANCE){
    motorSpeed = 200;
    currentState = ProgramState::RUNNING;
    return;
  }
  if (sensorDistance > STOP_SENSOR_DISTANCE){
    motorSpeed = 100;
    currentSpeed = ProgramState::MOVING;
    return;
  }
  motorSpeed = 0;
  currentSpeed = ProgramState::TOO_CLOSE;
  return;
}


void loop(){
  readUltrasonicSensorValues();
  readSerialInput();
  determineWhatToDo();
  writeLogToSerial();
}
```

---
# Coding conventions

- Document what you are doing with comments for each function (intentions) if it is not obvious.
- Don't repeat code (actual logic) with comments.
- Adapt a consistent naming style.
- Rember to put indentions properly. :star:
- Use verbs for functions, and nouns for variables and classes.
- Give meaningful names, e.g. `i` vs `motorIndex`.

---
- Avoid using pointers (pass by reference instead). Arduino has very limited memories (8KB) so dynamic memory allocation can caused memory leakages. Also there are no OOM on Arduino, you won't know what broke your program. Hence prefer allocate on stack rather than heap. (There are also tools for analysing memory usages but obvously won't work with `new` or `malloc()` :star:.).
- Use containers if you really need dynamic memory array like the built-in `String` or `Array`/`Vector` libraries.
- Don't use exceptions (`throw`) (there are no exceptions in Arduino anyway).
- You MAY want to use early return to code branches to achieve cleaner code. See the `determineWhatToDo()` example above.

---
## Suggested style guide

- Adapted from [Google C++ style guide](
https://google.github.io/styleguide/cppguide.html#Variable_Names).
- Modified to match existing conventions in the arduino ecosystem.
- You don't have to follow this, just make sure it is consistent across your group members' code.

---
### Formatting

- 2 spaces for each level.
- Don't use tabs.
- Each line should not exceed 80 chars.
- Use clang-format :star:.
- Namespaces doesn't need indentions.

---
### Naming

- Make sure the naming will be understandable even read by people not in your group.

---
- Use CamelCase for class, structs and types

```c++
TimedState
BluetoothController
UrlParaser
I2cImpl
```

---
- Use camelCase for function names, the first word should be a verb ideally.

```c++
readUltrasonicSensorValues();
readSerialInput();
determineWhatToDo();
writeLogToSerial();
getNextInput();
setMotorSpeed();
```

---
- For functions parameters, global variables, function local variables and struct member variables, use snake_case.

```c++
float convertToFloat(int num){
  bool is_positive;
}
```

---
- For both static and instance class member variables, use snake_case with underscore (snake_case_).
- Useful for differentiating between local variables and class member variables.

---
```c++
class TimedState : public State {
 protected:
  bool is_entered_ = false;

 public:
  TimedState(unsigned long period);
  void forceEnter() override;
};

TimedState::TimedState(unsigned long period) : period_(period) {}

void TimedState::forceEnter() {
  is_entered_ = true;
  timestamp_ = millis();
}
```

---
- Use snake_case for namespaces.

```c++
namespace timed_state;
```

---
- Use capital letter with underscores for macros.
- Avoid use of macros.
- Some constants in the arduino ecosystem are defined using macros, follow macros conventions to name them if you have a reason to use one. However, you 

```c++
#define ROUND(x) ...
#define PI_ROUNDED 3.0
```

---
Some references

https://llvm.org/docs/CodingStandards.html#name-types-functions-variables-and-enumerators-properly
https://google.github.io/styleguide/cppguide.html#Variable_Names

---
# Sampling

- Some sensors has pretty large error margins (e.g. ultrasonic sensors).
- Just one measurement may get you a wrong value.
- Solution: Take measurements from the sensor multiple times, sort the values, and then take the average of the middle values.
- Let's use [`qsort()`](https://www.nongnu.org/avr-libc/user-manual/group__avr__stdlib.html#gafd4bf2faec43342e7ad3d2ab37bac1fe) to do it.

---
```c++

```