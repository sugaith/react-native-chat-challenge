# react-native-chat-challenge

## Install / Run

- Open `chat-challenge/.env` file and populate the `EXPO_PUBLIC_OPENAI_KEY` with the key provided by email

- run inside `chat-challenge` folder (the Expo project folder):

```bash
    npm i
    npm run android
    npm run ios
```

- Recommended Node version: `20.18.0`

## System Design

### Execution Plan / Thoughts

Since the challenge did not specify the backend design and also seemed to prioritize the React Native app, I assumed that this part was open.

A chat app between real users requires connection-oriented technologies (like websockets). Initially, I thought of using Firebase with REST to mimic a chat or create a local mock.

After some consideration, I realized I could integrate an LLM, which would provide a good experience for a fast start and to actually have someone (or something) to test the chat flow. This idea aligns well with the challenge description.

### Tech and Design Choices

#### Foundation

The main technologies worth mentioning are:

##### `zustand` for state management

##### `Tamagui` for advanced UI support

Upsides:

- Has Error Boundaries for components out-of-the-box
- TypeScript oriented
- Works well with expo-fonts
- Good support for themes/UI (avatars, icons, etc.)

Downsides:

- A bit of friction during setup and configuration

##### `react-native-gifted-chat`

- Good support for Chat UIs
- Used in production apps for quite some time
- Fully customizable
- Saves a lot of development time

##### `OpenAI API`

Upsides:

- Easy and fast to set up and work with
- Large community with many examples and support available

Downside:

- Requires an API Key

##### `expo-camera`

Upside:

- Easy to install

Downside:

- Doesn't work properly in emulators

##### `react-native-gesture-handler`

- Used to handle double-taps

##### `react-native-reanimated`

- Used to manage animations

#### Project Structure

##### Git / Version Control

The choice was the `conventional-commits` pattern, prepared for the `semantic-version` process.

##### Business Rules Implementations

- Business rules are implemented in a modular way, mostly inside separate hooks or functions.

##### Workspace UI Folders

I chose the `Atomic Design Method`, which consists of 3 main groups: `atoms`, `molecules`, and `organisms`.

- `atoms`: basic components
- `molecules`: components composed of `atoms`
- `organisms`: components composed of `molecules`

Besides being well-organized, this approach also has a practical advantage: the code dependency remains linear (`atoms` -> `molecules` -> `organisms`), avoiding cyclic dependency issues.

##### Backend Integration

As mentioned earlier, the choice for the backend was to integrate with an LLM (OpenAI). We're using their SDK, which is REST-based.

However, the integration is loosely coupled, allowing for easy modifications to integrate other backend solutions.

## Worklog

### Problems Encountered

- **Tamagui**: Issues setting up Tamagui; had to downgrade some versions to make it work.

- Spent time researching and testing options for implementing the Chat UI, eventually selecting the `GiftedChat` library.

- **EAS**: Problems deploying a build to EAS. It was opening the app with a blank screen after deployment.

- Wanted to implement a light/dark theme switcher, but didn't have enough time.

- Also wanted to implement `mmkv` to save conversations locally with `zustand`, but ran out of time.
