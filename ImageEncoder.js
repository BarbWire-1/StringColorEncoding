export default class ImageEncoder {
	constructor(canvasId, colorKey, pxSize) {
		this.canvas = document.getElementById(canvasId);
		this.canvasSize = 0;
		this.colorKey = colorKey;
		this.pxSize = pxSize;
        this.context = this.canvas.getContext("2d");
        
        // Create the download link once
        const imageDataUrl = this.canvas.toDataURL("image/png");

		
        
            this.downloadLink = document.createElement("a");
            this.downloadLink.href = imageDataUrl;
            this.downloadLink.download = "encoded_image.png";
            this.downloadLink.innerHTML = "Download Encoded Image";
            this.canvas.after(this.downloadLink);
       
    
	}

	initializeCanvas(str) {
		this.canvasSize = Math.ceil(Math.sqrt(str.length));
		this.canvas.width = this.canvasSize * this.pxSize;
		this.canvas.height = this.canvasSize * this.pxSize;
	}

	getColorAt(x, y) {
		const pixelData = this.context.getImageData(
			x * this.pxSize,
			y * this.pxSize,
			this.pxSize,
			this.pxSize
		).data;
		const [red, green, blue] = pixelData;
		return `rgb(${red}, ${green}, ${blue})`;
	}

	encodeColor(charCode) {
		let step = Math.ceil(255 / 128);
		const r = step * charCode;
		const g =
			charCode % 3 === 1
				? step * charCode
				: ((255 / 128) * (this.colorKey * charCode)) % 255;
		const b =
			charCode % 3 === 2
				? step * charCode
				: ((255 / 128) * (8 * this.colorKey * charCode)) % 255;
		return `rgb(${r}, ${g}, ${b})`;
	}

	decodeColor(rgbColor) {
		const rgbValues = rgbColor.match(/\d+/g).map(Number);
		const [r] = rgbValues;
		const charCode = Math.floor((r * 128) / 255);
		return charCode;
	}

	encodeStringToImage(str) {
        this.initializeCanvas(str);

		// Canvas rows
		for (let y = 0; y < this.canvasSize; y++) {
			// Canvas columns
			for (let x = 0; x < this.canvasSize; x++) {
				const i = y * this.canvasSize + x; // Get index based on row and column
				if (i < str.length) {
					const char = str[i];
					const charCode = char.charCodeAt(0);
					const color = this.encodeColor(charCode);
					this.context.fillStyle = color;
					this.context.fillRect(
						x * this.pxSize,
						y * this.pxSize,
						this.pxSize,
						this.pxSize
					);
				}
			}
        }
	const imageDataUrl = this.canvas.toDataURL("image/png");

	//Create a link to download the image
	this.downloadLink.href = imageDataUrl;
	

	//document.body.appendChild(downloadLink);
	//this.canvas.after(downloadLink);


	}

	decodeImage(canvas) {
		//console.log(canvas);
		const ctx = canvas.getContext("2d");
		const imageData = ctx.getImageData(
			0,
			0,
			canvas.width,
			canvas.height
		).data;
		let chars = [];

		for (let y = 0; y < canvas.height; y += this.pxSize) {
			for (let x = 0; x < canvas.width; x += this.pxSize) {
				const pixelIndex = (y * canvas.width + x) * 4;
				const red = imageData[pixelIndex];
				const charCode = (red * 128) / 255;
				const char = String.fromCharCode(charCode);
				chars.push(char);
			}
		}

        const stringFromImage = chars.join("");
        console.log(stringFromImage)
		return stringFromImage;
    }
    decodeUploadedImage(img) {
        const uploadedCanvas = document.createElement("canvas");
        uploadedCanvas.width = img.width;
        uploadedCanvas.height = img.height;
        const uploadedContext = uploadedCanvas.getContext("2d");
        uploadedContext.drawImage(img, 0, 0, img.width, img.height);
        //document.body.appendChild(uploadedCanvas)// correct Image
        // Decode the uploaded image
        const decodedText = this.decodeImage(uploadedCanvas); // Use 'this.decodeImage'
        //console.log(decodedText) // wrong text
        document.getElementById("output").innerText = decodedText;
    }

    
}




