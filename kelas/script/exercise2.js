let reshuffleArray = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};
let textNumberQuestion = () => {
	let boxs = document.querySelectorAll(".boxSoalan");

	if (Math.random() > 0.5) {
		boxs[0].textContent = flow.max;
		boxs[1].textContent = flow.min;
	} else {
		boxs[0].textContent = flow.min;
		boxs[1].textContent = flow.max;
	}
};
let textNumberChoice = (items) => {
	let count = 0;
	items.forEach((item) => {
		addClass(item, "pilih");

		if (flag.isStepAnswer || flag.isStepSum) {
			item.textContent = `${arrayChoice[count]}`;
		} else {
			if (flag.isPickMax) {
				item.textContent = `+${arrayChoice[count]}`;
			} else {
				item.textContent = `-${arrayChoice[count]}`;
			}
		}

		count++;
	});
};


let addClass = (element, classs) => { element.classList.add(classs) };
let removeClass = (element, classs) => { element.classList.remove(classs) };
let addListerner = (element, event, func) => { element.addEventListener(event, func) };
let removeListerner = (element, event, func) => { element.removeEventListener(event, func) };


let pointer;
let textMessage = document.getElementById("textMessage")
let boxsSoalan = document.querySelectorAll(".boxSoalan");
let boxsAction = document.querySelectorAll(".boxAction");
let boxSumAction = document.querySelectorAll(".boxSumAction");
let boxSum = document.querySelector(".boxSum");
let choiseItems = document.querySelectorAll(".choise-item");
let choiseGroup = document.querySelector(".choise-group");

let updateTextMessage = (text) => {
	textMessage.textContent = text;
};

let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let flow = {
	max: null,
	min: null,
	borrow: null,
	actionMax: null,
	actionMin: null,
	hasilActionMax: null,
	hasilActionMin: null,
	jumlah: null,
};

let base = 10;

let number1 = 0
let number2 = 0;
let boxSelected;

let arrayPoll = [5, 6, 7, 8, 9];
// let arrayPoll = [6, 6,];
let arrayBase10Poll = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let arrayChoice = [];
let pickFirst = null
let flag = {
	isChoise: false,
	isPickMax: true,
	isStepAnswer: false,
	isStepSum: false,
	isDonePickBigger: false,
	isPickHint: false
};
let count = {
	hint: 5,
	currentQuestion: 1,
	totalQuestion: 5,
	currentScore: 0,
	totalScore: 6,
}
let step = {
	actionMax: false,
	actionMin: false,
	sumBorrowMax: false,
	sumBorrowMin: false,
	Total: false,
};

let tamat = () => {
	document.querySelector(".popUpContainer2").style.display = "flex";
};

let nextQuestion = () => {

	if (count.currentQuestion - 1 == count.totalQuestion) {
		tamat()

	} else {
		count.currentScore = 0
		console.log("win");

		reset()
		randomInit();
		ramalan();
		updateStatus()
		textNumberQuestion()
		console.log(flow);
	}
}



let updateStatus = () => {
	document.getElementById("lavel").textContent = `${count.currentQuestion}/${count.totalQuestion}`
	document.getElementById("hintCount").textContent = `${count.hint}`;
	document.getElementById("score").textContent = `${count.currentScore}/${count.totalScore}`;
};



let randomInit = () => {
	let arr = [...arrayPoll]
	reshuffleArray(arr);
	reshuffleArray(arr);
	reshuffleArray(arr);
	number1 = arr[0];
	// arr = arr.filter((num) => num !== number1);
	reshuffleArray(arr);
	reshuffleArray(arr);
	reshuffleArray(arr);
	number2 = arr[0];
};

let ramalan = () => {
	if (number1 > number2) {
		flow.max = number1;
		flow.min = number2;
	} else {
		flow.max = number2;
		flow.min = number1;
	}

	flow.borrow = 10 - flow.max;

	flow.actionMax = `+${flow.borrow}`;
	flow.actionMin = `-${flow.borrow}`;

	flow.hasilActionMax = flow.max + flow.borrow;
	flow.hasilActionMin = flow.min - flow.borrow;

	flow.jumlah = flow.max + flow.min;
};



let pollTextSum = () => {
	let picked
	picked = flow.jumlah;
	arrayChoice[0] = picked;
	arrayChoice[1] = picked + 1;
	arrayChoice[2] = picked - 1;
	arrayChoice[3] = picked + 2;
	arrayChoice[4] = picked - 2;
	arrayChoice[5] = picked + 3;

	reshuffleArray(arrayChoice);
	reshuffleArray(arrayChoice);
	reshuffleArray(arrayChoice);
};

let pollTextSumBorrow = () => {
	let picked
	if (flag.isPickMax) {
		picked = flow.hasilActionMax;
	} else {
		picked = flow.hasilActionMin;
	}
	arrayChoice[0] = picked;
	arrayChoice[1] = picked + 1;
	arrayChoice[2] = picked - 1;
	arrayChoice[3] = picked + 2;
	arrayChoice[4] = picked - 2;
	arrayChoice[5] = picked + 3;

	reshuffleArray(arrayChoice);
	reshuffleArray(arrayChoice);
	reshuffleArray(arrayChoice);
};

let pollTextAction = () => {

	let available = [...arrayBase10Poll];
	let picked = flow.borrow;
	arrayChoice[0] = picked;
	available = available.filter((num) => num != picked);

	for (let index = 1; index < 6; index++) {
		arrayChoice[index] = available[0];
		let chosen = available[0];
		available = available.filter((num) => num != chosen);

	}
	// console.log({available});
	// console.log({arrayChoice});

	reshuffleArray(arrayChoice);
	reshuffleArray(arrayChoice);
	reshuffleArray(arrayChoice);
};



let handleTotal = async (e) => {
	if (flag.isChoise) return;

	let element = e.target;
	addClass(element, "kuning");
	addClass(boxSelected, "kuning");

	boxSelected.querySelector("#text").textContent = element.textContent;

	await delay(500);
	flag.isChoise = true;

	removeClass(element, "kuning");
	removeClass(boxSelected, "kuning");

	if (boxSelected.querySelector("#text").textContent == flow.jumlah) {
		clearHint();
		updateTextMessage("Tahniahh!");

		addClass(element, "betul");
		addClass(boxSelected, "betul");
		await delay(2000);
		removeClass(element, "betul");
		removeClass(boxSelected, "borderDash");

		count.currentScore++;
		updateStatus();
		count.currentQuestion++;

		choiseItems.forEach((item) =>
			removeListerner(item, "click", handleTotal),
		);

		if (count.currentScore == count.totalScore) {
			flag.isChoise = false;
			nextQuestion();
		}

	} else {
		addClass(element, "salah");
		addClass(boxSelected, "salah");
		await delay(500);
		removeClass(boxSelected, "salah");
		removeClass(element, "salah");
		boxSelected.querySelector("#text").textContent = ``;
	}
	flag.isChoise = false;

};

let handleSumBorrow = async (e) => {
	if (flag.isChoise) return;
	flag.isChoise = true;

	let element = e.target;
	addClass(element, "kuning");
	addClass(boxSelected, "kuning");

	boxSelected.textContent = element.textContent;

	await delay(500);

	removeClass(element, "kuning");
	removeClass(boxSelected, "kuning");

	if (flag.isPickMax) {
		if (boxSelected.textContent == flow.hasilActionMax) {
			clearHint();

			addClass(element, "betul");
			addClass(boxSelected, "betul");
			await delay(500);
			removeClass(element, "betul");
			removeClass(boxSelected, "borderDash");
			flag.isPickMax = false;
			choiseItems.forEach((item) => removeListerner(item, "click", handleSumBorrow));

			step.sumBorrowMin = true;

			count.currentScore++;
			updateStatus();

			initSumBorrow();

		} else {
			addClass(element, "salah");
			addClass(boxSelected, "salah");
			await delay(500);
			removeClass(element, "salah");
			removeClass(boxSelected, "salah");

			boxSelected.textContent = ``;

		}

	} else {
		if (boxSelected.textContent == flow.hasilActionMin) {
			clearHint();

			addClass(element, "betul");
			addClass(boxSelected, "betul");
			await delay(500);
			choiseItems.forEach((item) => removeListerner(item, "click", handleSumBorrow));
			removeClass(element, "betul");
			removeClass(boxSelected, "borderDash");
			flag.isPickMax = true;
			flag.isStepAnswer = false;
			flag.isStepSum = true;

			step.Total = true

			count.currentScore++;
			updateStatus();

			initTotal();

		} else {
			addClass(boxSelected, "salah");
			addClass(element, "salah");
			await delay(500);
			removeClass(boxSelected, "salah");
			removeClass(element, "salah");
			boxSelected.textContent = ``
		}
	}

	flag.isChoise = false;
};

let handleAction = async (e) => {
	if (flag.isChoise) return;
	flag.isChoise = true;

	let element = e.target;
	addClass(element, "kuning");
	addClass(boxSelected, "kuning");

	boxSelected.textContent = element.textContent;

	await delay(500);

	if (boxSelected.textContent == flow.actionMax || boxSelected.textContent == flow.actionMin) {
		clearHint();

		removeClass(boxSelected, "kuning");
		removeClass(element, "kuning");
		addClass(boxSelected, "betul");
		addClass(element, "betul");
		choiseItems.forEach((item) => removeListerner(item, "click", handleAction));

		await delay(500);
		removeClass(boxSelected, "borderDash");
		removeClass(element, "betul");

		count.currentScore++;
		updateStatus();

		if (flag.isPickMax) {
			flag.isPickMax = false;
			step.actionMin = true;

			initAction();

		} else {
			boxSelected = null;
			flag.isStepAnswer = true;
			flag.isPickMax = true;
			step.sumBorrowMax = true

			initSumBorrow();
		}
		flag.isChoise = false;

	} else {
		console.log("max salah");
		removeClass(boxSelected, "kuning");
		removeClass(element, "kuning");
		addClass(boxSelected, "salah");
		addClass(element, "salah");

		await delay(500);
		removeClass(boxSelected, "salah");
		removeClass(element, "salah");
		boxSelected.textContent = ``;
		flag.isChoise = false;
	}
};

let handleChooseBigger = async (e) => {
	if (flag.isChoise) return;
	flag.isChoise = true;

	let element = e.target;
	addClass(element, "kuning");
	await delay(500);

	if (flow.max == element.textContent) {
		updateTextMessage("Betulll");
		await delay(500);

		removeClass(element, "kuning");
		addClass(element, "betul");

		removeClass(boxsSoalan[0], "pilih");
		removeClass(boxsSoalan[1], "pilih");
		removeClass(boxsSoalan[0], "borderDash");
		removeClass(boxsSoalan[1], "borderDash");

		boxsSoalan.forEach((box) => removeListerner(box, "click", handleChooseBigger));
		flag.isDonePickBigger = true

		step.actionMax = true;

		count.currentScore++
		updateStatus()

		pickFirst = element.dataset.id

		initAction();

	} else {
		removeClass(element, "kuning");
		addClass(element, "salah");
		await delay(500);
		removeClass(element, "salah");
		updateTextMessage("Upsss Salah");
		await delay(1000);
		updateTextMessage("Pilih Nombor Ynag Paling Besar");


	}

	flag.isChoise = false;
};



let initTotal = () => {
	updateTextMessage(`Berapa Hasil ${flow.hasilActionMax} + ${flow.hasilActionMin}`);
	boxSelected = boxSum
	addClass(boxSelected, "pilih");
	addClass(boxSelected, "borderDash");

	pollTextSum();
	textNumberChoice(choiseItems);

	choiseItems.forEach((item) => addListerner(item, "click", handleTotal));
};

let initSumBorrow = () => {
	if (flag.isPickMax) updateTextMessage(`Berapa Hasil ${flow.max} + ${flow.borrow}`);
	else updateTextMessage(`Berapa Hasil ${flow.min} - ${flow.borrow}`)

	if (pickFirst == 0) {
		if (
			flag.isPickMax
		) {
			pointer = 0;
		} else {
			pointer = 1;
		}
	} else {
		if (
			flag.isPickMax
		) {
			pointer = 1;
		} else {
			pointer = 0;
		}
	}

	boxSelected = boxSumAction[pointer];
	addClass(boxSelected, "pilih");
	addClass(boxSelected, "borderDash");

	pollTextSumBorrow();
	textNumberChoice(choiseItems);

	choiseItems.forEach((item) => addListerner(item, "click", handleSumBorrow));
};

let initAction = () => {
	if (flag.isPickMax) updateTextMessage(`${flow.max} Tambah Berapa Dapat 10`);
	else updateTextMessage(`Apabila Kawan Sebelah Tambah ${flow.borrow} di disini kene Tolak ${flow.borrow}`);

	if (
		pickFirst == 0
	) {
		if (flag.isPickMax) {
			addClass(boxsAction[0], "pilih");
			addClass(boxsAction[0], "borderDash");
			boxSelected = boxsAction[0];
		} else {
			addClass(boxsAction[1], "pilih");
			addClass(boxsAction[1], "borderDash");
			boxSelected = boxsAction[1];
		}
	} else {
		if (flag.isPickMax) {
			addClass(boxsAction[1], "pilih");
			addClass(boxsAction[1], "borderDash");
			boxSelected = boxsAction[1];
		} else {
			addClass(boxsAction[0], "pilih");
			addClass(boxsAction[0], "borderDash");
			boxSelected = boxsAction[0];
		}
	}

	choiseGroup.style.opacity = 1

	pollTextAction();
	textNumberChoice(choiseItems);

	choiseItems.forEach((item) => addListerner(item, "click", handleAction));
};

let initChooseBigger = () => {
	updateTextMessage("Pilih Nombor Ynag Paling Besar")
	document.querySelectorAll(".boxSoalan").forEach((box) => {
		addClass(box, "pilih");
		addClass(box, "borderDash");
		addListerner(box, "click", handleChooseBigger);
	});
};

let hint = () => {
	if (!flag.isDonePickBigger || count.hint == 0 || flag.isPickHint || flag.isChoise) return
	flag.isPickHint = true
	count.hint--
	console.log("hint");
	updateStatus()
	let predict

	if (step.Total) {
		//actionMax
		predict = flow.jumlah;

	} else if (step.sumBorrowMin) {
		//actionMin
		predict = flow.hasilActionMin;

	} else if (step.sumBorrowMax) {
		//sumBorrowMax
		predict = flow.hasilActionMax;

	} else if (step.actionMin || step.actionMax) {
		predict = flow.borrow

	}
	console.log({ predict });

	let pick = []
	let available = [...arrayChoice]
	available = available.filter((num) => num != predict);

	pick.push(predict)

	for (let index = 0; index < 2; index++) {
		let randomIndex = Math.floor(Math.random() * available.length);
		let randomValue = available[randomIndex];
		available = available.filter((num) => num != randomValue);
		pick.push(randomValue);
	}

	choiseItems.forEach(elemet => {
		let num = Math.abs(elemet.textContent);
		if (num == pick[0] || num == pick[1] || num == pick[2]) {
			addClass(elemet, "kuning");
		}
	})


}

let clearHint = () => {
	flag.isPickHint = false;
	choiseItems.forEach(element => {
		removeClass(element, "kuning")
	})
}

let reset = () => {

	if (flag.isChoise) return
	choiseGroup.style.opacity = 0;

	boxsSoalan.forEach(box => {
		box.classList.contains("betul") ? removeClass(box, "betul") : ""
		box.classList.contains("salah") ? removeClass(box, "salah") : ""
		box.classList.contains("pilih") ? removeClass(box, "pilih") : ""
		box.classList.contains("borderDash") ? removeClass(box, "borderDash") : ""
	})

	boxsAction.forEach(box => {
		box.classList.contains("betul") ? removeClass(box, "betul") : ""
		box.classList.contains("salah") ? removeClass(box, "salah") : ""
		box.classList.contains("pilih") ? removeClass(box, "pilih") : ""
		box.classList.contains("borderDash") ? removeClass(box, "borderDash") : ""
		box.textContent = ``
	})

	boxSumAction.forEach(box => {
		box.classList.contains("betul") ? removeClass(box, "betul") : ""
		box.classList.contains("salah") ? removeClass(box, "salah") : ""
		box.classList.contains("pilih") ? removeClass(box, "pilih") : ""
		box.classList.contains("borderDash") ? removeClass(box, "borderDash") : ""
		box.textContent = ``
	})

	boxSum.classList.contains("betul") ? removeClass(boxSum, "betul") : ""
	boxSum.classList.contains("salah") ? removeClass(boxSum, "salah") : ""
	boxSum.classList.contains("pilih") ? removeClass(boxSum, "pilih") : ""
	boxSum.classList.contains("borderDash") ? removeClass(boxSum, "borderDash") : ""
	boxSum.querySelector("#text").textContent = ``;

	boxsSoalan.forEach(box => {
		addClass(box, "pilih")
		addClass(box, "borderDash");
	})

	number1 = number2 = 0;
	boxSelected = null
	arrayChoice = []

	flag.isChoise = false
	flag.isPickMax = true
	flag.isStepAnswer = false;
	flag.isStepSum = false;
	flag.isDonePickBigger = false;
	flag.isPickHint = false;

	// count.hint = 5
	count.currentScore = 0,

		step.actionMax = false
	step.actionMin = false;
	step.sumBorrowMax = false;
	step.sumBorrowMin = false;
	step.Total = false;

	pointer = null

	boxsSoalan.forEach((box) => removeListerner(box, "click", handleChooseBigger));
	choiseItems.forEach((item) => removeListerner(item, "click", handleAction));
	choiseItems.forEach((item) => removeListerner(item, "click", handleSumBorrow));
	choiseItems.forEach((item) => removeListerner(item, "click", handleTotal));



	updateStatus();
	initChooseBigger()
}

let renderGame = () => {
	let app = document.getElementById("app")
	let t = style
	t += template
	app.insertAdjacentHTML("beforeend", t);
}

let homePage = () => {
	app()
}

let initBorrow = () => {
	// renderGame()

	textMessage = document.getElementById("textMessage")
	boxsSoalan = document.querySelectorAll(".boxSoalan");
	boxsAction = document.querySelectorAll(".boxAction");
	boxSumAction = document.querySelectorAll(".boxSumAction");
	boxSum = document.querySelector(".boxSum");
	choiseItems = document.querySelectorAll(".choise-item");
	choiseGroup = document.querySelector(".choise-group");

	updateStatus()
	randomInit();
	ramalan();
	console.log({ flow });
	textNumberQuestion();
	initChooseBigger();

	addListerner(document.getElementById("hint"), "click", hint);
	addListerner(document.getElementById("reset"), "click", reset);
	document.querySelectorAll("#home").forEach(btn => {
		addListerner(btn, "click", homePage)
	})

}
initBorrow()