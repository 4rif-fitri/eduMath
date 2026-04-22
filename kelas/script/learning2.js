let dialogContainer = document.querySelector(".dialog")
let dialogText = document.querySelector(".dialog h4")

let board1 = document.querySelector(".board")
let btnNext = document.getElementById("btnNext")

let box1 = document.querySelector(".box1")
let box2 = document.querySelector(".box2")

let step = 0

let move = (n1, n2) => {


	if (n1 > n2) {
		let beza = 10 - n1
		let number1 = parseInt(box1.querySelector("h2").textContent)
		number1 += beza
		document.querySelector(".box1 h2").textContent = number1

		let number2 = parseInt(box2.querySelector("h2").textContent)
		number2 -= beza
		document.querySelector(".box2 h2").textContent = number2


		for (let index = 0; index < beza; index++) {
			let div = document.createElement("div")
			div.classList.add("apple")
			box1.querySelector(".boxapple").appendChild(div)
		}
		for (let index = 0; index < beza; index++) {
			let apples = box2.querySelectorAll(".apple")
			apples[apples.length - 1].remove()
		}

	} else {
		let beza = 10 - n2

		let number1 = parseInt(box1.querySelector("h2").textContent)
		number1 -= beza
		document.querySelector(".box1 h2").textContent = number1
		let number2 = parseInt(box2.querySelector("h2").textContent)
		number2 += beza
		document.querySelector(".box2 h2").textContent = number2

		for (let index = 0; index < beza; index++) {
			let div = document.createElement("div")
			div.classList.add("apple")
			box2.querySelector(".boxapple").appendChild(div)
		}
		for (let index = 0; index < beza; index++) {
			let apples = box1.querySelectorAll(".apple")
			apples[apples.length - 1].remove()
		}
	}
}
let reset = (num1, num2) => {
	box1.classList.remove("yellow")
	box2.classList.remove("yellow")

	let b1 = box1.querySelectorAll(".apple")
	for (let index = 0; index < b1.length; index++) {
		b1[index].remove()
	}

	let b2 = box2.querySelectorAll(".apple")
	for (let index = 0; index < b2.length; index++) {
		b2[index].remove()
	}

	for (let index = 0; index < num1; index++) {
		let div = document.createElement("div")
		div.classList.add("apple")
		box1.querySelector(".boxapple").appendChild(div)
	}
	for (let index = 0; index < num2; index++) {
		let div = document.createElement("div")
		div.classList.add("apple")
		box2.querySelector(".boxapple").appendChild(div)
	}

	box1.querySelector("h2").textContent = num1
	box2.querySelector("h2").textContent = num2
}

let yellow = () => {
	let number1 = parseInt(box1.querySelector("h2").textContent)
	let number2 = parseInt(box2.querySelector("h2").textContent)

	if (number1 > number2) {
		box1.classList.add("yellow")
	} else {
		box2.classList.add("yellow")
	}
}

let nextStep = () => {
	step++

	switch (step) {
		case 1:
			dialogText.textContent = "Step 1: Pilih nombor paling besar"
			board1.classList.remove("hidden")
			break
		case 2:
			board1.querySelector(".box1").classList.add("yellow")
			break
		case 3:
			dialogText.textContent = "Step 2: Pasanagn Pelengkap 10 untuk 9 ialah 1"
			break
		case 4:
			dialogText.textContent = "Step 3: Jadi saya kene ambil 1 apple dari sebelah"
			break
		case 5:
			move(9, 2)
			break
		case 6:
			dialogText.textContent = "Jadi, jawapan 10 + 1 ialah 11"
			break
		case 7:
			reset(6, 7)
			dialogText.textContent = "Contoh 2, 6 apple tambah 7 apple"
			break
		case 8:
			dialogText.textContent = "Step 1: Pilih nombor paling besar"
			break
		case 9:
			yellow()
			break
		case 10:
			dialogText.textContent = "Step 2: Pasanagn Pelengkap 10 untuk 7 ialah 3"
			break
		case 11:
			dialogText.textContent = "Step 3: Jadi saya kene ambil 3 apple dari sebelah"
			break
		case 12:
			move(6, 7)
			break
		case 13:
			dialogText.textContent = "Jadi, jawapan 3 + 10 ialah 13"
			break

		case 14:
			reset(8, 8)
			dialogText.textContent = "Contoh 3, 8 apple tambah 8 apple"
			break
		case 15:
			dialogText.textContent = "Step 1: Pilih nombor paling besar"
			break
		case 16:
			dialogText.textContent = "kalau tengok dua dua nombor sama jadi pilih mane mane je"
			break
		case 17:
			yellow()
			break
		case 18:
			dialogText.textContent = "Step 2: Pasanagn Pelengkap 10 untuk 8 ialah 2"
			break
		case 19:
			dialogText.textContent = "Step 3: Jadi saya kene ambil 2 apple dari sebelah"
			break
		case 20:
			move(8, 8)
			break
		case 21:
			dialogText.textContent = "Jadi, jawapan 10 + 6 ialah 16"
			break
		case 22:
			board1.classList.add("hidden")
			dialogText.textContent = "Itu sahaja Bye"
			break
		case 23:
			window.location.href = "./index.html";
			break
	}

}

btnNext.addEventListener("click", nextStep)