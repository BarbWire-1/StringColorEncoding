export default class ImageEncoder {
	#canvas;
	#canvasSize;
	#context;
	#downloadLink;
    #isValid;
    
    #colorKey
    #pxSize
    #str
	constructor(canvasId, colorKey,pxSize) {
		this.#canvas = document.getElementById(canvasId);
		this.#canvasSize = 0;
		this.#colorKey = colorKey;
		this.#pxSize = pxSize;
		this.#context = this.#canvas.getContext("2d");

		// DownloadLink - snecessary being defined here? Otherwise it messes with appending multiple links
		const imageDataUrl = this.#canvas.toDataURL("image/png");
		this.#downloadLink = document.createElement("a");
		this.#downloadLink.href = imageDataUrl;
		this.#downloadLink.download = "encoded_image.png";
		this.#downloadLink.innerHTML = "Download Encoded Image";
		this.#canvas.after(this.#downloadLink);
		this.#isValid = false;
	}
	/**
	 * Inits the canvas in the needed size and form
	 * @param {*} str string base to create the canvas from in blocks
	 */
	#initializeCanvas(str) {
		this.#canvasSize = Math.ceil(Math.sqrt(str.length));
		this.#canvas.width = this.#canvasSize * this.pxSize;
		this.#canvas.height = this.#canvasSize * this.pxSize;
	}

	/**
	 * create colorCodes from CharCode
	 * @param {*} charCode
	 * @returns
	 */
	#encodeColor(charCode) {
		let step = Math.ceil(255 / 128);
		const r = step * charCode; // fix relation!;
		const g = (step * Math.random(2) * this.#colorKey * charCode) % 255;
		const b = (step * Math.random(18) * this.#colorKey * charCode) % 255;
		return `rgb(${r}, ${g}, ${b})`;
	}

	/**
	 * Write the colorBlocks with generated colors to canvas
	 * @param {*} str
	 */
	encodeStringToImage(str) {
		//str = btoa(str);
		this.#initializeCanvas(str);

		// Canvas rows
		for (let y = 0; y < this.#canvasSize; y++) {
			// Canvas columns
			for (let x = 0; x < this.#canvasSize; x++) {
				const i = y * this.#canvasSize + x; // Get index based on row and column
				if (i < str.length) {
					const char = str[i];
					const charCode = char.charCodeAt(0);
					let color = this.#encodeColor(charCode);

					if (i === 0) {
						// save the keys in the first encoded char's g, b and soften r
						let [r, b, g] = color;
						r = charCode;
						b = this.#pxSize;
						g = this.#colorKey;
						//console.log(r)//76
						color = `rgb(${r}, ${g}, ${b})`;
					}
					//console.log(color)
					this.#context.fillStyle = color;
					this.#context.fillRect(
						x * this.#pxSize,
						y * this.#pxSize,
						this.#pxSize,
						this.#pxSize
					);
				}
			}
		}
		// download the created image
		const imageDataUrl = this.#canvas.toDataURL("image/png");
		this.#downloadLink.href = imageDataUrl;
	}

	/**
	 * get charCode from the uploaded image if KEYS are correct
	 * @param {*} canvas of the uploaded image
	 * @returns the decoded string
	 */
	decodeImage(canvas) {
		//console.log(canvas);
		const ctx = canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		let chars = [];

		for (let y = 0; y < canvas.height; y += this.#pxSize) {
			for (let x = 0; x < canvas.width; x += this.#pxSize) {
				const pixelIndex = (y * canvas.width + x) * 4;
				let red = null;

				if (pixelIndex === 0) {
					// adjust r, check g,b for keys

					red = (imageData[pixelIndex] / 128) * 255;
					//console.log(red)//76 (?????)
					const green = imageData[pixelIndex + 1];
					//console.log(green)
					const blue = imageData[pixelIndex + 2];

					if (green !== this.#colorKey || blue !== this.#pxSize) {
						this.#isValid = false;
						return;
					}
				} else {
					red = imageData[pixelIndex];
					this.#isValid = true;
				}

				const charCode = (red * 128) / 255;
				let char = String.fromCharCode(charCode);
				//char = atob(char);
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

	//TODO only load the image when the keys are correct!
	decodeUploadedImage(img) {
		const uploaded = document.createElement("canvas");
		uploaded.width = img.width;
		uploaded.height = img.height;
		const uploadedContext = uploaded.getContext("2d");

		uploadedContext.drawImage(img, 0, 0, img.width, img.height);
        const decodedText = this.decodeImage(uploaded)
            ||
			"Please enter the correct keys! - (NOT YET IMPLEMENTED IN UI!)";;

		if (this.#isValid) {
			//console.log(this.#isValid)
			this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

			this.#context.drawImage(img, 0, 0, this.#canvas.width, this.#canvas.height);
		}
        return decodedText;
    }
    
    // Getter and Setter for str
    get str() {
    return this.#str;
  }

  set str(newValue) {
      this.#str = newValue;
      this.encodeStringToImage(newValue) 
  }

  // Getter and Setter for colorKey
  get colorKey() {
    return this.#colorKey;
  }

  set colorKey(newValue) {
    this.#colorKey = newValue;
  }

  // Getter and Setter for pxSize
  get pxSize() {
    return this.#pxSize;
  }

  set pxSize(newValue) {
    this.#pxSize = newValue;
  }
}