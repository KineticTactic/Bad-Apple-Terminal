const fs = require("fs");
const os = require("os");
const childprocess = require("child_process");

const build = (index) => {
    if (fs.existsSync("./data")) {
        fs.rmSync("./data", { recursive: true, force: true });
    }
    fs.mkdirSync("./data");

    fs.readdir("./frames", (err, files) => {
        files.sort((a, b) => {
            return parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
        });
        const unit = Math.ceil(files.length/os.cpus().length);
        let progress = 0;
        let processCount = Math.ceil(files.length/unit);
        for (let i = 0; i < processCount; i++) {
            const cprocess = childprocess.fork("./doFrame.js");
            cprocess.send({ id: i, index: i*unit+1, end: (i*unit)+unit+1 });
            cprocess.on("message", (msg) => { if (msg === "plus") progress++; process.stdout.write(`\rTo text frames... ${(progress/files.length*100).toFixed(2)}%`); });
            cprocess.on("exit", () => {
                processCount--;
                console.log(` ${processCount} processes left...`);
                
                if (processCount === 0) {
                    console.log("Frame extract done! Merging...");
                    mergeData();
                    process.exit();
                }
            })
        }
    });
};

function mergeData() {
    if (fs.existsSync("./data.txt")) {
        fs.writeFileSync("./data.txt", "", { flag: "w" }, (err) => {});
    }

    const data = fs.readdirSync("./data");
    data.sort((a, b) => {
        return parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
    });
    data.forEach((file) => {
        const content = fs.readFileSync(`./data/${file}`, "utf-8");
        fs.writeFileSync("./data.txt", content, { flag: "a" }, (err) => {});
    });
    console.log("Done!");
}

build(1);

module.exports.build = build;
