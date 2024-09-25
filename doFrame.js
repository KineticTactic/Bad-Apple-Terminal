const fs = require("fs");
const getPixels = require("get-pixels");
const { toFourDigits } = require("./utilities");

let id;
let startIndex;
let endIndex;

function doFrame(id, index = 1, end = NaN) {
  let indexString = toFourDigits(index.toString());
  let path = `frames/frame_${indexString}.png`;

  if (!isNaN(end) && index === end) {
    process.stdout.write(` Done. ${startIndex} to ${endIndex}`);
    return process.exit();
  };

  getPixels(path, (err, pixels) => {
      if (err) {
          process.stdout.write(` Done. ${startIndex} to ${endIndex}`);
          return process.exit();
      }

      let string = "";

      const symbols = "⠀⠃⠇⠏⠟⠿";

      let widthCounter = 0;
      for (let i = 0; i < pixels.data.length; i += 4) {
          let value = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
          value = Math.max(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);

          // string += getCharacterForGrayScale(value) + getCharacterForGrayScale(value);
          const index = Math.floor(value / (256 / 6));
          string += symbols[index].repeat(2);

          widthCounter++;
          if (widthCounter === 120) {
              widthCounter = 0;
              string += "\n";
          }
      }
      string += "\n";
      const regexes = [/(⠀+)/g, /(⠃+)/g, /(⠇+)/g, /(⠏+)/g, /(⠟+)/g, /(⠿+)/g];
      for (let i = 0; i < regexes.length; i++) {
          const matches = string.match(regexes[i]) || [];
          for (let match of matches) {
              string = string.replace(match, symbols[i] + toFourDigits(match.length.toString()));
          }
      }

      fs.writeFileSync(`./data/data_${id}.txt`, string, { flag: "a" }, (err) => {});

      process.send("plus");

      doFrame(id, index + 1, end);
  });
}

process.on('message', (msg) => {
  id = msg.id;
  startIndex = msg.index;
  endIndex = msg.end;
  doFrame(msg.id, msg.index, msg.end);
});