const grayRamp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

module.exports.getCharacterForGrayScale = (grayScale) =>
    grayRamp[Math.ceil(((grayRamp.length - 1) * grayScale) / 255)];

module.exports.toFourDigits = (string) => {
    while (string.length <= 3) {
        string = "0" + string;
    }
    return string;
};
