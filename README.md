## What it is

ZappSheets is an AR/MR application for musicians to practice their craft

## How to run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
You must go to `https` port.\
Open [https://localhost:3000](https://localhost:3000) to view it in your web browser.\
Open https://192...:3000 to view it in your mobile browser.

## Inspiration

As a self-taught amateur pianist, I always struggled with reading music, for the reasons that, apart from the lack of an instructor I guess, I don't have a music stand to place the sheets, and printing them is a pain anyway. Even if I did, switching sheet pages while playing is a common problem among musicians. That's how I came up with the idea of projecting music sheets on phone camera/VR headset.

## What it does

ZappSheets is conceptually a Mixed Reality(MR) application, to be used with a headset, but I was able to build a nice demo with the help of Universal AR from ZapWorks. It projects music sheets on camera, allows the option to display all pages side-by-side or to use voice commands (left-right) to switch between pages without even taking your hand off the instrument. It also has a built-in metronome to help keep time during practice.

## How we built it

The web application is built with **React.js**, all augmented-reality features with **Universal AR's React-Three.js SDK**, speech recognition with **TensorFlow**, and version control with **Git**.

## Challenges we ran into

Ironically, the hardest part was making the demo video. I had to record the phone screen, my speech, and piano track separately on 3 different devices, then edit them together; and who would have thought my video editing skills were terrible?

## Accomplishments that we're proud of

Overall, I believe that my project idea was decent and I managed to execute it pretty well. I worked with a lot of tools that I was unfamiliar with, but managed to build what I had in mind.

## What we learned

So many cool stuff. I took my first step into AR/VR/MR world, with amazing tools from ZapWorks. I managed to implement my first ML model. I also did gesture recognition to switch pages, but that turned out to be less useful than I thought, or I could've done it better :)

## What's next for ZappSheets

- Gesture recognition to switch pages
- Uploading music sheets
- Projecting a music stand to put sheets on
- A lot of other stuff for the built-in metronome (subdivisions, note stress, swing rhythm etc.)

