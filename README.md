# Bad Apple but it is played in the Terminal

Here is a Demo [Youtube video](https://youtu.be/_JTHbbsSCZk).

## Requirements

-   Node.js
-   FFmpeg
-   A terminal that supports unicode characters

## Steps to run

### `npm install`

Installs the required dependecies.

### `npm run prepare`
Prepare the resources for the included Bad Apple video by default.
- Extracts the video file into an image sequence.
- Reads the image sequence and generates `data/` containing the frames converted into text.

**OR**

### `npm run prepare <filepath>`
Prepare the resources for a specific video.

### `npm start`

Plays the video in the console. Enjoy!

Note: If you want to play it again, run `npm start`. You dont have to run the other commands, unless you delete the `data.txt` file.

Note^2: Make sure the console font size is small enough, otherwise it might not form the image properly, or start flickering. You know the font is small enough if the console doesnt start scrolling down.

## Contributors

Special thanks to [@yeonfish6040](https://github.com/yeonfish6040) for adding support for custom videos and optimising the video to text extraction process.
