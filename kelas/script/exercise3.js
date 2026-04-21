
let ui = {
	boxHasil: document.getElementById("hasil"),
	boxMoniter1: document.getElementById("moniter1"),
	boxMoniter2: document.getElementById("moniter2"),
	boxAsns: document.querySelectorAll(".soalan-item"),
	bar: document.getElementById("bar")
}
let count = {
	question: 1,
	betul: 0,
	salah: 0,
	masa: 0,
	saat: 0,
	minit: 0,
	formatedTime: "00:00",
}
let stateGame = {
	number1: 0,
	number2: 0,
	sum: 0,
	ketepatan: 0,
	kadarSalah: 0,
	avgTimeQuestion: 0,
	overall: 0,
	idTimer: null
}
let array = {
	boxChoise: []
}
let flag = {
	isPick: false,
	isAsnwerFirstQuestion: true,
}

let formadtedTime = (minit, saat) => {
	minit = String(minit).padStart(2, "0")
	saat = String(saat).padStart(2, "0")
	count.formatedTime = `${minit}:${saat}`
	updateBoard()
}

let timer = () => {
	if (stateGame.idTimer) return
	return setInterval(() => {

		count.saat++
		if (count.saat == 60) {
			count.saat = 0
			count.minit++
		}
		count.masa++
		formadtedTime(count.minit, count.saat)
	}, 1000)
}

let updateBoard = () => {
	document.getElementById("question").textContent = count.question
	document.getElementById("time").textContent = count.formatedTime
	document.getElementById("score").textContent = count.betul
	document.getElementById("wrong").textContent = count.salah
	document.getElementById("time").textContent = count.formatedTime
}

let updateMonitor = () => {
	document.getElementById("moniter1").textContent = stateGame.number1
	document.getElementById("moniter2").textContent = stateGame.number2
}

let handleGiveUp = () => {
	if (flag.isAsnwerFirstQuestion) return

	clearInterval(stateGame.idTimer)

	count.question--
	count.ketepatan = count.betul / count.question
	count.kadarSalah = count.salah / count.question
	count.avgTimeQuestion = count.masa / count.question
	let scoreTime = Math.max(0, 1 - (count.avgTimeQuestion / 10));
	count.overall = (count.ketepatan * 0.7) + (scoreTime * 0.3),

	document.getElementById("pop").style.visibility = "visible"
	document.getElementById("bilQuestion").textContent = count.question
	document.getElementById("masa").textContent = `${count.masa}saat`
	document.getElementById("betul").textContent = count.betul
	document.getElementById("salah").textContent = count.salah
	document.getElementById("ketepatan").textContent = `${(count.ketepatan * 100).toFixed(0)}%`
	document.getElementById("kadarSalah").textContent = `${(count.kadarSalah * 100).toFixed(0)}%`
	document.getElementById("avgTimeQuestion").textContent = `${(count.avgTimeQuestion).toFixed(2)} saat`
	document.getElementById("overall").textContent = `${(count.overall * 10).toFixed(0)}/10`

	let cvg = (count.overall * 10)

	if (cvg < 5) {
		document.getElementById("bad").style.display = "flex"
		document.getElementById("text").textContent = "Ape ni Main Tekan Ke"
		document.getElementById("overallElement").classList.add("bad")
	} else if (cvg < 8) {
		document.getElementById("notbad").style.display = "flex"
		document.getElementById("text").textContent = "Boleh Tahan"
		document.getElementById("overallElement").classList.add("notbad")
	} else {
		document.getElementById("good").style.display = "flex"
		document.getElementById("text").textContent = "Pandai Budak ni"
		document.getElementById("overallElement").classList.add("good")
	}
}
let random2to9 = () => Math.floor(Math.random() * 8) + 2

let nextNum = (n) => {
	let o = random2to9()
	do {
		o = random2to9()
	} while ((o + n) < 11 || o === n)
	stateGame.sum = o + n
	return o
}

let reshuffleArray = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))

		let temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}

	return arr
}

let randomChoise = () => {
	array.boxChoise[0] = stateGame.sum + 1
	array.boxChoise[1] = stateGame.sum - 1
	array.boxChoise[2] = stateGame.sum + 2
	array.boxChoise[3] = stateGame.sum - 2
	array.boxChoise[4] = stateGame.sum + 3
	array.boxChoise[5] = stateGame.sum
}

let delay = (masa) => new Promise(resolve => setTimeout(resolve, masa))

let showaBar = async () => {

	ui.bar.style.opacity = 1
	ui.bar.style.animation = "bar 0.5s linear"
	await delay(500)
	ui.bar.style.opacity = 0
	ui.bar.style.animation = ""

	ui.boxHasil.textContent = ""
	flag.isPick = false
	setup()
}

let handlePick = (e) => {
	if (flag.isPick) return
	flag.isAsnwerFirstQuestion = false
	flag.isPick = true
	ui.boxHasil.textContent = e.target.textContent

	ui.boxHasil.classList.remove("kuning")
	if (parseInt(e.target.textContent) === stateGame.sum) {
		ui.boxHasil.classList.add("betul")
		e.target.classList.add("betul")
		count.betul++
		console.log(count.betul);

	} else {
		ui.boxHasil.classList.add("salah")
		e.target.classList.add("salah")
		count.salah++
		console.log(count.salah);

	}
	count.question++
	updateBoard()
	showaBar()
}

let setup = () => {
	ui.boxHasil.classList.remove("salah")
	ui.boxHasil.classList.remove("betul")
	ui.boxHasil.classList.add("kuning")

	document.querySelectorAll(".soalan-item").forEach(element => {
		element.classList.remove("salah")
		element.classList.remove("betul")
	})

	document.querySelectorAll(".soalan-item").forEach(element => element.removeEventListener("click", handlePick))

	updateBoard()
	stateGame.number1 = random2to9()
	stateGame.number2 = nextNum(stateGame.number1)
	updateMonitor()
	randomChoise()
	reshuffleArray(array.boxChoise)
	reshuffleArray(array.boxChoise)
	reshuffleArray(array.boxChoise)
	document.querySelectorAll(".soalan-item").forEach((element, index) => {
		element.textContent = array.boxChoise[index]
		element.addEventListener("click", handlePick)
	})
}

let homePage = () => {

	clearInterval(stateGame.idTimer)

	ui.boxHasil = null
	ui.boxMoniter1 = null
	ui.boxMoniter2 = null
	ui.boxAsns = null
	ui.bar = null

	count.question = 1
	count.betul = 0
	count.salah = 0
	count.masa = 0
	count.saat = 0
	count.minit = 0
	count.formatedTime = "00:00"

	stateGame.number1 = 0
	stateGame.number2 = 0
	stateGame.sum = 0
	stateGame.ketepatan = 0
	stateGame.kadarSalah = 0
	stateGame.avgTimeQuestion = 0
	stateGame.overall = 0
	stateGame.idTimer = null

	array.boxChoise = []

	flag.isPick = false
	flag.isAsnwerFirstQuestion = true

	app.innerHTML = ''
	app()
}

let initQuiz = () => {

	ui.boxHasil = document.getElementById("hasil"),
	ui.boxMoniter1 = document.getElementById("moniter1"),
	ui.boxMoniter2 = document.getElementById("moniter2"),
	ui.boxAsns = document.querySelectorAll(".soalan-item"),
	ui.bar = document.getElementById("bar")

	stateGame.idTimer = timer()

	setup()

	ui.bar.style.opacity = 0

	document.getElementById("giveUp").addEventListener("click", handleGiveUp)
	document.querySelectorAll("#back").forEach(btn => btn.addEventListener("click", homePage))
}
initQuiz()