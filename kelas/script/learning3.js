let imgs = document.querySelectorAll(".img")
let IMG = document.querySelector(".IMG")
let left = document.querySelector(".left")
let right = document.querySelector(".right")
let textRight = document.getElementById("textRight")
let textLeft = document.getElementById("textLeft")
let actionRight = document.getElementById("actionRight")
let actionLeft = document.getElementById("actionLeft")
let sumRight = document.getElementById("sumRight")
let sumLeft = document.getElementById("sumLeft")
let SumLeft = document.getElementById("SumLeft")
let SumRight = document.getElementById("SumRight")
let SUM = document.getElementById("SUM")

let isDragging = false
let numberLeft = 5
let numberRight = 6
let current = null
let from = null
textLeft.textContent = numberLeft
textRight.textContent = numberRight

imgs.forEach(img => {
	img.addEventListener("mousedown", e => {
		isDragging = true
		current = img

		from = img.parentElement.classList.contains("left") ? "left" : "right"

		IMG.style.opacity = 1
		IMG.style.left = (e.pageX - IMG.offsetWidth / 2) + "px"
		IMG.style.top = (e.pageY - IMG.offsetHeight / 2) + "px"
	})
})

document.addEventListener("mouseup", e => {
	isDragging = false

	IMG.style.opacity = 0

	left.classList.remove("highlight")
	right.classList.remove("highlight")

	let rectRight = right.getBoundingClientRect()
	let rectLeft = left.getBoundingClientRect()

	let inRight =
		e.clientX >= rectRight.left &&
		e.clientX <= rectRight.right &&
		e.clientY >= rectRight.top &&
		e.clientY <= rectRight.bottom

	let inLeft =
		e.clientX >= rectLeft.left &&
		e.clientX <= rectLeft.right &&
		e.clientY >= rectLeft.top &&
		e.clientY <= rectLeft.bottom

	let valRight = parseInt(actionRight.textContent)
	let valLeft = parseInt(actionLeft.textContent)
	if (current) {
		// LEFT → RIGHT
		if (inRight && from === "left") {
			right.appendChild(current)
			valRight += 1
			valLeft -= 1
			// numberRight += 1
			// numberLeft -= 1

		}

		// RIGHT → LEFT
		else if (inLeft && from === "right") {
			left.appendChild(current)
			valRight -= 1
			valLeft += 1
			// numberRight -= 1
			// numberLeft += 1

		}

		textRight.textContent = numberRight
		textLeft.textContent = numberLeft
		actionLeft.textContent = ctv(valLeft)
		actionRight.textContent = ctv(valRight)
		sumLeft.textContent = half(numberLeft, valLeft)
		sumRight.textContent = half(numberRight, valRight)

		SumLeft.textContent = jwp(numberLeft, valLeft)
		SumRight.textContent = jwp(numberRight, valRight)

		// textLeft.textContent = sub(numberLeft, valLeft)
		// textRight.textContent = sub(numberRight, valRight)

		SUM.textContent = (numberLeft + numberRight)
	}

	current = null
})

function sub(valOri, valMinus) {
	if (valMinus > 0) return `${valOri} (+ ${Math.abs(valMinus)})`
	else if (valMinus < 0) return `${valOri} (- ${Math.abs(valMinus)})`
	else return `${valOri}`
}

function jwp(valOri, valMinus) {
	if (valMinus > 0) return `${valOri + Math.abs(valMinus)}`
	else if (valMinus < 0) return `${valOri - Math.abs(valMinus)}`
	else return `${valOri + Math.abs(valMinus)}`
}

function half(valOri, valMinus) {
	// console.log(valOri);
	// console.log(valMinus);

	if (valMinus > 0) return `${valOri} + ${Math.abs(valMinus)}`
	else if (valMinus < 0) return `${valOri} - ${Math.abs(valMinus)}`
	else return `${valOri} + ${Math.abs(valMinus)}`

}

function ctv(val) {
	if (val > 0) {
		return `+${Math.abs(val)}`
	} else if (val < 0) {
		return `-${Math.abs(val)}`
	} else {
		return 0
	}
}
		document.addEventListener("mousemove", e => {
			if (!isDragging) return

			left.classList.remove("highlight")
			right.classList.remove("highlight")

			IMG.style.left = (e.pageX - IMG.offsetWidth / 2) + "px"
			IMG.style.top = (e.pageY - IMG.offsetHeight / 2) + "px"

			// HIGHLIGHT LOGIC
			let rectRight = right.getBoundingClientRect()
			let rectLeft = left.getBoundingClientRect()

			// Check if hovering over Right
			if (e.clientX >= rectRight.left && e.clientX <= rectRight.right &&
				e.clientY >= rectRight.top && e.clientY <= rectRight.bottom) {
				right.classList.add("highlight")
			} else {
				right.classList.remove("highlight")
			}

			// Check if hovering over Left
			if (e.clientX >= rectLeft.left && e.clientX <= rectLeft.right &&
				e.clientY >= rectLeft.top && e.clientY <= rectLeft.bottom) {
				left.classList.add("highlight")
			} else {
				left.classList.remove("highlight")
			}
		})