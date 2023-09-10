import ImageEncoder from "./ImageEncoder.js";
import { cryptical } from "./index.js";

(function () {
    

    // Function to handle the click events
function handleButtonClick(event) {
    const target = event.target;

    // get pxSize and colorKey values
    const imageInput = document.getElementById('imageInput');
    const pxSizeInput = document.getElementById('canvas-key');
    const colorKeyInput = document.getElementById('color-key');
    const textField = document.getElementById('textField');
    const pxSize = +pxSizeInput.value;
    const colorKey = +colorKeyInput.value;

    switch (target.id) {
        case 'encrypt-button':
            
            const textToEncrypt = textField.value;
            // encode string with the given settings
            cryptical.pxSize = pxSize;
            cryptical.colorKey = colorKey;
            cryptical.encodeStringToImage(textToEncrypt);

            break;
        case 'imageInput':
            // Handle the "Upload & Decrypt Image" button click
            
            const label = document.querySelector("label[for=imageInput]");
            const file = imageInput.files[0];
            let fileName = "";
            //console.log('clicked uploadButton')// ok
            if (file) {
                fileName = file.name;
                const reader = new FileReader();

                reader.onload = (e) => {
                    const img = new Image();
                    try {
                        img.src = e.target.result;
                        img.onload = () => {
                            textField.innerText = cryptical.decodeUploadedImage(img)
                        
                        };
                        img.onerror = (error) => {
                            console.error("Image load error:", error);
                        };
                        } catch (error) {
                            console.error("Error loading image:", error);
                        }
                };

                reader.readAsDataURL(file);
            }
            label.innerText = fileName;
            setTimeout(() => {
                label.innerText = "Upload Encrypted Image";
            }, 3000);
            break;
        // Add more cases for other buttons if needed
    }
}

    // Get the navigation container
    const navigationContainer = document.getElementById('navigation');

    // Add event delegation to the navigation container
    navigationContainer.addEventListener('click', (event) => {
        handleButtonClick(event, cryptical);
    });
    
    // Add event listener for color-key input
    navigationContainer.addEventListener('input', (event) => {
        const target = event.target;
        
        if (target.id === 'color-key') {
            
            cryptical.colorKey = +target.value;
            
        } else if (target.id === 'canvas-key') {
           
            cryptical.pxSize = +target.value;
        }
    });
    
    
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
			img.onload = () => {
				textField.innerText = cryptical.decodeUploadedImage(img);
			};
		};

		reader.readAsDataURL(file);
	}
	label.innerText = fileName;
	setTimeout(() => {
		label.innerText = "Upload Encrypted Image";
	}, 3000);
});

})();
