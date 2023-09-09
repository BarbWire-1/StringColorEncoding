import ImageEncoder from "./ImageEncoder.js";





let str =
	"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.. ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ß!§$%&/()=?°^,.-_:;#+'*'";

//str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ßA .,; --_`;
str = `This is really a fun thingy! Only downside is that I'm not able to regulate a nicer color-distribution without loosing uniqueness of charCode-colorcode-relation!... AND iwant to get rid of those tailing whitespace.But tomorrow is another day... aaaand: I need to hardcode a color for return and some other charCodes`;

// crashed the implementation of colorKey for decoding :(

// TODO check how it could be possible to have a nicer color range but keeping UNIQUE colorCodes par char
// TODO 'return'  NOT applied - special characters, tab.... I need to add an array for those
// TODO change hight to only NEEDED rows!
// TODO change to a button instead of the label

// TODO style output: centered if placeholder, else left

// TODO test with base64! befor getting charCodes!
// !!!!!!!TODO test alternating with modulo to user,g,b,a,for placing the charcode-info
// Encode to Base64
const originalString = "Hello, World!";
const base64Encoded = btoa(originalString);
//console.log({ base64Encoded });

// Decode from Base64
const decodedString = atob(base64Encoded);
//console.log({ decodedString });

//-------------------------------------------------------------------------------------------------------------------
// // !!!!!TODO add the pxSize and the colorKey to necessary input as combined key!!!!!
// const colorKey = 7;
// const pxSize = 10;
// 
// // Get elements
// const canvas = document.getElementById("characterCanvas");
 const imageInput = document.getElementById("imageInput");
 const textInput = document.getElementById("textInput");
// 
 const textarea = document.getElementById("output");
// 
// // Necessary to set placeholder text with line breaks, so strange!
textarea.placeholder =
	"Enter the text to encode (not yet implemented)\nOr upload an encoded image to decode it.";

// const canvasSize = Math.ceil(Math.sqrt(str.length)); // Calculate canvas size to get a square
// canvas.width = canvasSize * pxSize;
// canvas.height = canvasSize * pxSize;
// const context = canvas.getContext("2d");
// 
// // get color at specific coords
// function getColorAt(x, y) {
// 	const pixelData = context.getImageData(x * pxSize, y * pxSize, pxSize, pxSize)
// 		.data;
// 	const [red, green, blue] = pixelData;
// 	return `rgb(${red}, ${green}, ${blue})`;
// }
// 
// function encodeColor(charCode) {
// 	let step = Math.ceil(255 / 128);
// 	const r = step * charCode; // only fix relation used to decode later
// 	const g =
// 		charCode % 3 === 0 ? step * charCode : (step * 2 * colorKey * charCode) % 255;
// 	const b =
// 		charCode % 2 === 1
// 			? step * charCode
// 			: (step * 18 * colorKey * charCode) % 255;
// 	return `rgb(${r}, ${g}, ${b})`;
// }
// 
// function decodeColor(rgbColor) {
// 	const rgbValues = rgbColor.match(/\d+/g).map(Number);
// 	const [r] = rgbValues;
// 	const charCode = Math.floor((r * 128) / 255);
// 	return charCode;
// }
// 
// function encodeStringToImage(str) {
// 	// canvas rows
// 	for (let y = 0; y < canvasSize; y++) {
// 		// canvas columns
// 		for (let x = 0; x < canvasSize; x++) {
// 			const i = y * canvasSize + x; // get index based on row and column
// 			if (i < str.length) {
// 				const char = str[i];
// 				const charCode = char.charCodeAt(0);
// 				const color = encodeColor(charCode);
// 				context.fillStyle = color;
// 				context.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
// 			}
// 		}
// 	}
// 
// 	const imageDataUrl = canvas.toDataURL("image/png");
// 
// 	// Create a link to download the image
// 	const downloadLink = document.createElement("a");
// 	downloadLink.href = imageDataUrl;
// 	downloadLink.download = "encoded_image.png";
// 	downloadLink.innerHTML = "Download Encoded Image";
// 
// 	document.body.appendChild(downloadLink);
// 	canvas.after(downloadLink);
// }
// 
// // analyse the uploaded image by getting red of each first px in a color-block
// // reversing it back to charCode => char
// function decodeImage(canvas, pxSize) {
// 	const ctx = canvas.getContext("2d");
// 	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
// 	let chars = [];
// 
// 	for (let y = 0; y < canvas.height; y += pxSize) {
// 		for (let x = 0; x < canvas.width; x += pxSize) {
// 			const pixelIndex = (y * canvas.width + x) * 4;
// 			const red = imageData[pixelIndex];
// 			const charCode = (red * 128) / 255;
// 			const char = String.fromCharCode(charCode);
// 			chars.push(char);
// 		}
// 	}
// 
// 	const stringFromImage = chars.join("");
// 	return stringFromImage;
// }

// init an istance
let test = new ImageEncoder('testCanvas', 5, 20);
test.encodeStringToImage(str)
//test.decodeImage(test.canvas)


// TODO add listeners for str, colorKey, pxSize
//test.colorKey = 8
test.encodeStringToImage(str)
// test.decodeImage(test.canvas)

//test.pxSize = 30

// when changed after generating the decoding will fail - which is good!
//UPLOAD image - check to reduce on 1 px to directly decode 1: 1
imageInput.addEventListener("change", (event) => {

	const label = document.querySelector("label[for=imageInput]");
	const file = event.target.files[0];
	let fileName = "";


	if (file) {
		fileName = file.name;
		const reader = new FileReader();

		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;
            //document.body.append(img)
			img.onload = () => {
				test.decodeUploadedImage(img)
			};
		};

		reader.readAsDataURL(file);
	}
	label.innerText = fileName;
	setTimeout(() => {
		label.innerText = "Upload Encrypted Image";
	}, 3000);
});

//encodeStringToImage(str);





