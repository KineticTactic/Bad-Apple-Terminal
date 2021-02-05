const ffmpeg = require("ffmpeg");
const fs = require("fs");

if (!fs.existsSync("./frames")) {
    fs.mkdirSync("./frames");
}

try {
    ffmpeg("res/BadApple.mp4").then(
        (video) => {
            console.log("Processing Video...");
            video.setVideoSize("120x90");
            video.save("frames/BadApple%04d.png", (error, file) => {
                if (error) console.log(error);
                else console.log("Video has been processed!");
            });
        },
        (err) => {
            console.log(`Error: ${err}`);
        }
    );
} catch (e) {
    console.log(e.code);
    console.log(e.message);
}
