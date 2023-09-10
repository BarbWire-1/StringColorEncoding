import ImageEncoder from "./ImageEncoder.js";
import './UI.js';

let str =
	"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.. ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ß!§$%&/()=?°^,.-_:;#+'*'";

//str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789A ^.,; --_`;
//str = `This is really a fun thingy! Only downside is that I'm not able to regulate a nicer color-distribution without loosing uniqueness of charCode-colorcode-relation!... AND iwant to get rid of those tailing whitespace.But tomorrow is another day... aaaand: I need to hardcode a color for return and some other charCodes`;

// crashed the implementation of colorKey for decoding :(

// TODO check how it could be possible to have a nicer color range but keeping UNIQUE colorCodes par char
// TODO 'return'  NOT applied - special characters, tab.... I need to add an array for those
// TODO change hight to only NEEDED rows!
// TODO change to a button instead of the label

// TODO style output: centered if placeholder, else left

// TODO test with base64! befor getting charCodes!
// !!!!!!!TODO test alternating with modulo to user,g,b,a,for placing the charcode-info




// init an instance with canvasId, colorKey, pixelSize
let cryptical = new ImageEncoder("testCanvas", 93, 20);
cryptical.encodeStringToImage(str);

let decoded = cryptical.decodeImage(document.getElementById("testCanvas"));

//console.log(decoded)
cryptical.str = 'blahblahblah'
console.log(cryptical.str)

export { cryptical }




