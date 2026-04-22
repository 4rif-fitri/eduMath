let dialogContainer = document.querySelector(".dialog")
let dialogText = document.querySelector(".dialog h4")

let board1 = document.querySelector(".board")
let board2 = document.querySelector(".board2")
let board3 = document.querySelector(".board3")

let btnNext = document.getElementById("btnNext")

let step = 0

let tuka = (num1, num2, num3, num4, num5, num6, n1, n2, n3) => {
	document.querySelector(".satu").style.backgroundImage = `url(./imgs/${num1}.png)`
	document.querySelector(".dua").style.backgroundImage = `url(./imgs/${num2}.png)`
	document.querySelector(".empat").style.backgroundImage = `url(./imgs/${num3}.png)`
	document.querySelector(".lima").style.backgroundImage = `url(./imgs/${num4}.png)`
	document.querySelector(".tujuh").style.backgroundImage = `url(./imgs/${num5}.png)`
	document.querySelector(".lapan").style.backgroundImage = `url(./imgs/${num6}.png)`

	document.querySelector(".sembilan").textContent = n1
	document.querySelector(".duaBelas").textContent = n2
	document.querySelector(".limeBelas").textContent = n3
}

let tuka3 = (n1, n2) => {
	board3.querySelector(".SATU").textContent = n1
	board3.querySelector(".DUA").textContent = n2
}



let nextStep = () => {
	step++

	switch (step) {
		case 1:
			dialogText.textContent = "Pelengkap 10 ialah pasangan dua nombor yang menghasilkan 10 "
			board2.classList.remove("hidden")
			break
		case 2:
			tuka(5, 4, 1, 0, 5, 5, 9, 1, 10)
			board2.classList.add("hidden")
			board1.classList.remove("hidden")
			dialogText.textContent = "sembilan tambah satu same dengan sepuluh"
			break
		case 3:
			tuka(1, 0, 5, 4, 5, 5, 1, 9, 10)
			dialogText.textContent = "begitu juga, satu tambah sembilan same dengan sepuluh "
			break
		case 4:
			board1.classList.add("hidden")
			board3.classList.remove("hidden")
			dialogText.textContent = "Jadi 9 dan 1 adalah pasangan pelengkap 10"
			break
		case 5:
			tuka(5, 3, 2, 0, 5, 5, 8, 2, 10)
			board3.classList.add("hidden")
			board1.classList.remove("hidden")
			dialogText.textContent = "lapan tambah dua same dengan sepuluh"
			break
		case 6:
			tuka(2, 0, 5, 3, 5, 5, 2, 8, 10)
			dialogText.textContent = "begitu juga , dua tambah lapan same dengan sepuluh "
			break
		case 7:
			tuka3(8, 2)
			board1.classList.add("hidden")
			board3.classList.remove("hidden")
			dialogText.textContent = "Jadi 8 dan 2 adalah pasangan pelengkap 10"
			break
		case 8:
			tuka(5, 2, 3, 0, 5, 5, 7, 3, 10)
			board3.classList.add("hidden")
			board1.classList.remove("hidden")
			dialogText.textContent = "tujuh tambah tiga same dengan sepuluh "
			break
		case 9:
			tuka(3, 0, 5, 2, 5, 5, 3, 7, 10)
			dialogText.textContent = "begitu juga, tiga tambah tujuh same dengan sepuluh "
			break
		case 10:
			tuka3(7, 3)
			board1.classList.add("hidden")
			board3.classList.remove("hidden")
			dialogText.textContent = "Jadi 7 dan 3 adalah pasangan pelengkap 10"
			break
		case 11:
			tuka(5, 1, 4, 0, 5, 5, 6, 4, 10)
			board3.classList.add("hidden")
			board1.classList.remove("hidden")
			dialogText.textContent = "enam tambah empat same dengan sepuluh"
			break
		case 12:
			tuka(4, 0, 5, 1, 5, 5, 4, 6, 10)
			dialogText.textContent = "begitu juga, empat tambah enam same dengan sepuluh"
			break
		case 13:
			tuka3(6, 4)
			board1.classList.add("hidden")
			board3.classList.remove("hidden")
			dialogText.textContent = "Jadi 6 dan 4 adalah pasangan pelengkap 10"
			break
		case 14:
			board3.classList.add("hidden")
			board1.classList.remove("hidden")
			tuka(5, 0, 5, 0, 5, 5, 5, 5, 10)
			dialogText.textContent = "lima tambah lima same dengan sepuluh"
			break
		case 15:
			tuka3(5, 5)
			board1.classList.add("hidden")
			board3.classList.remove("hidden")
			dialogText.textContent = "Jadi 5 dan 5 adalah pasangan pelengkap 10"
			break
		case 16:
			board3.classList.add("hidden")
			dialogText.textContent = "Itu sahaja Bye"
			break
		case 17:
			window.location.href = "./index.html";

	}

}

btnNext.addEventListener("click", nextStep)