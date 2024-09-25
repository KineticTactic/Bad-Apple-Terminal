const ffmpeg = require("ffmpeg");
const fs = require("fs");

const { Jimp } = require("jimp");

if (fs.existsSync("./frames")) {
    fs.rmSync("./frames", { recursive: true, force: true });
}
fs.mkdirSync("./frames");

function extract() {
    const file = process.argv.length === 2 ? "res/BadApple.mp4" : process.argv[2];
    console.log(`Extracting frames from ${file}`);
    try {
        ffmpeg(file).then(
            (video) => {
                console.log("Processing Video...");
                video.setVideoSize("120x90");   
                video.save("frames/frame_%04d.png", (error, file) => {
                    if (error) console.log(error);
                    else console.log("Video has been processed!");
                    toGrayScale();
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
}

function toGrayScale() {
    fs.readdir("./frames", (err, files) => {
        let i = 0;
        files.forEach((file, index) => {
            Jimp.read(`./frames/${file}`).then((image) => {
                if (err) throw err;
                image.greyscale().write(`./frames/${file}`);
                i++;
                process.stdout.write(`\rTo grayscale... ${(i/files.length*100).toFixed(0) == 100 ? "100% complete" : (i/files.length*100).toFixed(2)+"%"}`);
            });
        });
    });
}

extract();