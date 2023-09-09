export default class ImageEncoder {
    /**
     * 
     * @param {*} canvasId add this to HTML where you need it
     * @param {*} colorKey changes relations in rgb - this should be in g
     * @param {*} pxSize changes size of colorBlocks - this should be in b of last px
     */
	constructor(canvasId, colorKey, pxSize) {
		this.canvas = document.getElementById(canvasId);
		this.canvasSize = 0;
		this.colorKey = colorKey;
		this.pxSize = pxSize;
        this.context = this.canvas.getContext("2d");
        
        // DownloadLink
        const imageDataUrl = this.canvas.toDataURL("image/png");
        this.downloadLink = document.createElement("a");
        this.downloadLink.href = imageDataUrl;
        this.downloadLink.download = "encoded_image.png";
        this.downloadLink.innerHTML = "Download Encoded Image";
        this.canvas.after(this.downloadLink);
    
	}
    /**
     * Inits the canvas in the needed size and form
     * @param {*} str string base to create the canvas from in blocks
     */
	initializeCanvas(str) {
		this.canvasSize = Math.ceil(Math.sqrt(str.length));
		this.canvas.width = this.canvasSize * this.pxSize;
		this.canvas.height = this.canvasSize * this.pxSize;
	}
    
    /**
     * get the color of pixel at coord
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
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
    
    /**
     * create colorCodes from CharCode
     * @param {*} charCode 
     * @returns 
     */
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
    /**
     * get the charCode from r
     * @param {*} rgbColor 
     * @returns 
     */
	decodeColor(rgbColor) {
		const rgbValues = rgbColor.match(/\d+/g).map(Number);
		const [r] = rgbValues;
		const charCode = Math.floor((r * 128) / 255);
		return charCode;
	}
    
    /**
     * Write the colorBlocks with generated colors to canvas
     * @param {*} str 
     */
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
    // download the created image
	const imageDataUrl = this.canvas.toDataURL("image/png");
	this.downloadLink.href = imageDataUrl;
	
	}

    /**
     * get charCode from the uploaded image if KEYS are correct
     * @param {*} canvas of the uploaded image
     * @returns the decoded string 
     */
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
        //console.log(stringFromImage)
		return stringFromImage;
    }
    
    /**
     * creates a canvas for the uploaded image,
     * decodes the pixels
     * writes result to the textarea
     * @param {*} img uploaded image
     */
    decodeUploadedImage(img) {
        const uploaded = document.createElement("canvas");
         uploaded.width = img.width;
         uploaded.height = img.height;
        const uploadedContext = uploaded.getContext("2d");
        uploadedContext.drawImage(img, 0, 0, img.width, img.height);
        const decodedText = this.decodeImage(uploaded);
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height )
        this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height )
        document.getElementById("output").innerText = decodedText;
    }

    
}




