
import { cryptical } from "./index.js";

const imageInput = document.getElementById('imageInput')
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
                
                document.getElementById("textField").innerText =
			        cryptical.decodeUploadedImage(img);
			};
		};

		reader.readAsDataURL(file);
	}
	label.innerText = fileName;
	setTimeout(() => {
		label.innerText = "Upload Encrypted Image";
	}, 3000);
});