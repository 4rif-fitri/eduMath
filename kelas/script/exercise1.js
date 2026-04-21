let arrayPoll = [1, 2, 3, 4, 5];
let lineArray = [];

let items = document.querySelectorAll(".soalan-item");
let idElement = 0;
let isPickBoth = false;
let isPickFirst = false;

let lastId = null

let count = {
	hint: 5,
	currentQuestion: 1,
	totalQuestion: 3,
	currentScore: 0,
	totalScore: 3,
}
let flag = {
	isPickHint: false,
	isPickReset: false
}

let element1 = null
let element2 = null;
let number1 = 0
let number2 = 0;
let sum = 0;

// let popUp = document.querySelector(".popUpContainer");
let popUpContainer2 = document.querySelector(".popUpContainer2");

let reshuffleArray = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};
let push = (arr, poll) => {
	for (let index = 0; index < 3; index++) {
		arr[index] = poll[index];
	}
	let count = 0;
	for (let index = 3; index < 6; index++) {
		arr[index] = 10 - arr[count];
		count++;
	}
	return arr;
};
let addClass = (element, classs) => {
	element.classList.add(classs);
};
let removeClass = (element, classs) => {
	element.classList.remove(classs);
};
let addListerner = (element, event, func) => {
	element.addEventListener(event, func);
};
let removeListerner = (element, event, func) => {
	element.removeEventListener(event, func);
};

let displayMoniter = (num, id) => {

	if (lastId == id) {
		document.getElementById("moniter1").textContent = ""
		document.getElementById("moniter2").textContent = ""
		lastId = null
		return
	}

	if (document.getElementById("moniter1").textContent == "") {
		document.getElementById("moniter1").textContent = num
	} else {
		document.getElementById("moniter2").textContent = num
	}
	lastId = id
}

let unSelect = (elementt) => {
	removeClass(elementt, "pilih");
	element1 = null;
	number1 = 0;
	idElement = null;
	isPickFirst = false;
};

let updateStatus = () => {
	document.getElementById("lavel").textContent = `${count.currentQuestion}/${count.totalQuestion}`
	document.getElementById("hintCount").textContent = `${count.hint}`;
	document.getElementById("score").textContent = `${count.currentScore}/${count.totalScore}`;
};
let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let coutWin = async () => {
	count.currentScore++
	updateStatus()


	if (count.currentScore == count.totalScore) {
		flag.isPickHint = true
		await delay(2000)
		if (count.currentQuestion == count.totalQuestion) {
			popUpContainer2.style.display = "flex";
		} else {
			nextSoalan()
		}
		flag.isPickHint = false
	}
};


let checkChoice = async () => {
	if (number1 == 0 || number2 == 0) return;

	if (number1 + number2 == 10) {
		// console.log("betul");

		addClass(element1, "betul");
		addClass(element2, "betul");

		removeListerner(element1, "click", handlePickBox);
		removeListerner(element2, "click", handlePickBox);

		addClass(document.getElementById("moniter1"), "betul")
		addClass(document.getElementById("moniter2"), "betul")

		await delay(500);
		sum = number1 + number2;

		element2.textContent = sum;
		element1.remove();

		document.querySelectorAll(".soalan-item").forEach((itm) => removeClass(itm, "borderDash"));

		removeClass(document.getElementById("moniter1"), "betul")
		removeClass(document.getElementById("moniter2"), "betul")

		coutWin();
	} else {
		// console.log("salah");
		removeClass(element1, "pilih");
		removeClass(element2, "pilih");

		addClass(element1, "salah");
		addClass(element2, "salah");

		addClass(document.getElementById("moniter1"), "salah")
		addClass(document.getElementById("moniter2"), "salah")

		await delay(500);

		removeClass(element1, "salah");
		removeClass(element2, "salah");

		removeClass(document.getElementById("moniter1"), "salah")
		removeClass(document.getElementById("moniter2"), "salah")

	}

	isPickBoth = false;
	isPickFirst = false;
	element1 = element2 = null;
	number1 = number2 = 0;

	flag.isPickHint = flag.isPickReset = false;

	document.getElementById("moniter1").textContent = null
	document.getElementById("moniter2").textContent = null
};

let handlePickBox = (e) => {
	if (isPickBoth) return

	e.stopPropagation();

	let elementt = e.target
	displayMoniter(parseInt(elementt.textContent), elementt.dataset.id)


	if (elementt.dataset.id === idElement) {
		unSelect(elementt);
		return;
	}

	idElement = elementt.dataset.id;
	
	if (isPickFirst == false) {
		element1 = elementt;
		addClass(element1, "pilih");
		number1 = parseInt(element1.textContent);
		isPickFirst = true;

	} else if (isPickFirst == true) {
		element2 = elementt;
		addClass(element2, "pilih");
		number2 = parseInt(element2.textContent);
		isPickBoth = true;
		flag.isPickHint = flag.isPickReset = true;
		checkChoice();

	}
	flag.isPickHint = false
};

let HandleReset = () => {
	if (flag.isPickReset) return;

	items.forEach((item) =>
		item.classList.contains("pilih") ? removeClass(item, "pilih") : "",
	);
	items.forEach((item) =>
		item.classList.contains("salah") ? removeClass(item, "salah") : "",
	);
	items.forEach((item) =>
		item.classList.contains("betul") ? removeClass(item, "betul") : "",
	);

	idElement = null

	newBox()
};

let newBox = () => {
	let container = document.querySelector(".choices");
	container.innerHTML = ``;
	for (let index = 0; index < lineArray.length; index++) {
		container.innerHTML += `
	 	<button data-id="${index}" class="soalan-item">
			${lineArray[index]}
		</button>
	 `;
	}

	idElement = 0;
	flag.isPickReset = false;
	flag.isPickHint = false;
	sum = 0;
	count.currentScore = 0
	isPickBoth = false;
	isPickFirst = false;
	element1 = element2 = null;
	number1 = number2 = 0;

	items = ``;
	items = document.querySelectorAll(".soalan-item");

	updateStatus()

	items.forEach((item) => removeListerner(item, "click", handlePickBox));
	items.forEach((item) => addListerner(item, "click", handlePickBox));
}
let handleHint = () => {

	if (count.hint == 0 || flag.isPickHint) return;
	flag.isPickHint = true
	count.hint--;
	updateStatus()

	let no1, no2, predik = 0;
	let e1, e2;
	let isFirts = false;
	let itemm = document.querySelectorAll(".soalan-item");

	itemm.forEach((itm) => {
		let no = parseInt(itm.querySelector(".number").textContent);
		console.log(no);
		if (no != 10) {
			if (!isFirts) {
				no1 = no;
				predik = 10 - no1;
				e1 = itm;
				isFirts = true;
			} else {
				if (no == predik) {
					no2 = no;
					e2 = itm;
					console.log({ no1 });
					console.log({ no2 });
				}
			}
		}
	});
	addClass(e1, "borderDash");
	addClass(e2, "borderDash");
};

let nextSoalan = () => {
	items = document.querySelectorAll(".soalan-item");
	count.currentQuestion++
	updateStatus()
	randomSoalan()
	newBox();
}

let randomSoalan = () => {
	reshuffleArray(arrayPoll);
	push(lineArray, arrayPoll);
	reshuffleArray(lineArray);
	reshuffleArray(lineArray);

	for (let index = 0; index < items.length; index++) {
		items[index].dataset.number = lineArray[index];
		items[index].textContent = lineArray[index];
	}
}

let initMatching = () => {
	// popUpContainer2 = document.querySelector(".popUpContainer2");
	items = document.querySelectorAll(".choices button");

	randomSoalan()
	updateStatus()

	items.forEach((item) => addListerner(item, "click", handlePickBox));
	addListerner(document.getElementById("reset"), "click", HandleReset);
	addListerner(document.getElementById("hint"), "click", handleHint);
	document.querySelectorAll("#home").forEach(btn => {
		addListerner(btn, "click", homePage)
	})
}
initMatching()