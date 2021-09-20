# Bad Apple but it is played in the Terminal

Here is a Demo [Youtube video](https://youtu.be/_JTHbbsSCZk).

## Requirements

-   Node.js
-   FFmpeg
-   A terminal that supports unicode characters

## Steps to run

### `npm install`

Installs the required dependecies.

### `npm run extract`

Extracts the video file into an image sequence.

### `npm run build`

Reads the image sequence and generates `data.txt` containing the frames converted into text.

### `npm start`

Plays the video in the console. Enjoy!

Note: If you want to play it again, run `npm start`. You dont have to run the other commands, unless you delete the `data.txt` file.

Note^2: Make sure the console font size is small enough, otherwise it might not form the image properly, or start flickering. You know the font is small enough if the console doesnt start scrolling down.
