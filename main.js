function saveTask() {
    const arrayTasks = getArrayFromStorage();
    const newTask = getNewTask();
    arrayTasks.push(newTask);
    saveToLocalStorage(arrayTasks);
}

function getArrayFromStorage() {
    let arrayTasks = JSON.parse(localStorage.getItem("all tasks"));
    if (arrayTasks === null) {
        arrayTasks = [];
    }
    return arrayTasks;
}

function getNewTask() {
    const textBox = document.getElementById("textBox");
    const text = textBox.value;

    const dateBox = document.getElementById("dateBox");
    const date = dateBox.value;

    const timeBox = document.getElementById("timeBox");
    const time = timeBox.value;

    const spanText = document.getElementById("spanText");
    const spanDate = document.getElementById("spanDate");
    const spanTime = document.getElementById("spanTime");
    spanText.innerText = "";
    spanDate.innerText = "";
    spanTime.innerText = "";

    return {
        text,
        date,
        time,
    }
}

function saveToLocalStorage(arrayTasks) {
    const textBox = document.getElementById("textBox");
    const text = textBox.value;

    const dateBox = document.getElementById("dateBox");
    const date = dateBox.value;

    const timeBox = document.getElementById("timeBox");
    const time = timeBox.value;

    if (text === "") {
        const spanText = document.getElementById("spanText");
        spanText.innerText = "Missing Task !"
        spanText.style.color = "red";
        return;

    } else if (text.length < 5) {
        const spanText = document.getElementById("spanText");
        spanText.innerText = "The Task must have a minimum of 5 characters !"
        spanText.style.color = "red";
        return;
    }

    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (text.match(format)) {
        const spanText = document.getElementById("spanText");
        spanText.innerText = "The Task must have letters and not just symbols !"
        spanText.style.color = "red";
        return;

    } else if (date === "") {
        const spanDate = document.getElementById("spanDate");
        spanDate.innerText = "Missing Date !"
        spanDate.style.color = "red";
        return;
    }

    // date length should be 10 characters (no more no less) 
    else if (date.length !== 10) {
        const spanDate = document.getElementById("spanDate");
        spanDate.innerText = "The Date isn't Validate!"
        spanDate.style.color = "red";
        return;
    }

    // third and sixth character should be '/' 
    else if (date.substring(4, 5) !== '-' || date.substring(7, 8) !== '-') {
        const spanDate = document.getElementById("spanDate");
        spanDate.innerText = "The Date is invalid!"
        spanDate.style.color = "red";
        return;
    }

    // // extract month, day and year from the ExpiryDate (expected format is mm/dd/yyyy) 
    // // subtraction will cast variables to integer implicitly (needed 
    // // for !== comparing)

    const month = date.substring(0, 2) - 1; // because months in JS start from 0 
    const day = date.substring(3, 5) - 0;
    const year = date.substring(0, 4) - 0;

    // test year range 
    if (year < 1000 || year > 3000) {
        const spanDate = document.getElementById("spanDate");
        spanDate.innerText = "The Date isn't Validate!"
        spanDate.style.color = "red";
        return;

    } else if (time === "") {
        const spanTime = document.getElementById("spanTime");
        spanTime.innerText = "Missing Time !"
        spanTime.style.color = "red";
        return;

    } else {
        localStorage.setItem("all tasks", JSON.stringify(arrayTasks));
    }

    textBox.value = "";
    textBox.focus();
    dateBox.value = "";
    timeBox.value = "";

    displayToUi();
}

function displayToUi() {
    const arrayTasks = getArrayFromStorage();
    const listOfTasks = document.getElementById("listOfTasks");
    listOfTasks.innerHTML = displayFromStorage(arrayTasks);
}

function displayFromStorage(arrayTasks) {

    if (arrayTasks.length === 0) {
        return '';
    }
    let list = ''
    for (let i = 0; i < arrayTasks.length; i++) {

        list += `<li id="li-${i}" class="fadeIn hover">
            <div class="buttonDelete"> 
            <button onclick="deleteTask(${i})"
            id="button-${i}" class="close-button">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 
            </button>
            </div>
            <p class="textListItem">
            ${arrayTasks[i].text} 
            </p>
            <p class="dateListItem">
            ${arrayTasks[i].date} 
            </p>
            <p class="timeListItem">
            ${arrayTasks[i].time}
            </p>
        </li>`
    }
    return list;
}

function deleteTask(id) {

    const arrayTasks = JSON.parse(localStorage.getItem("all tasks"));

    arrayTasks.splice(id, 1);

    localStorage.setItem("all tasks", JSON.stringify(arrayTasks));

    const listOfTasks = document.getElementById("listOfTasks");
    listOfTasks.innerHTML = displayNewArray(arrayTasks);
}

function displayNewArray(arrayTasks) {
    if (arrayTasks.length === 0) {
        return '';
    }
    let list = ''
    for (let i = 0; i < arrayTasks.length; i++) {
        list += `<li id="li-${i}" class="hover">
        <div class="buttonDelete"> 
        <button onclick="deleteTask(${i})"
        id="button-${i}" class="close-button">
        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 
        </button>
        </div>
        <p class="textListItem">
        ${arrayTasks[i].text} 
        </p>
        <p class="dateListItem">
        ${arrayTasks[i].date} 
        </p>
        <p class="timeListItem">
        ${arrayTasks[i].time}
        </p>      
        </li>`
    }
    return list;
}

function clearTask() {
    const textBox = document.getElementById("textBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    textBox.value = "";
    textBox.focus();
    dateBox.value = "";
    timeBox.value = "";

    const spanText = document.getElementById("spanText");
    const spanDate = document.getElementById("spanDate");
    const spanTime = document.getElementById("spanTime");
    spanText.innerText = "";
    spanDate.innerText = "";
    spanTime.innerText = "";

}

function loadStorage() {
    let arrayTasks = JSON.parse(localStorage.getItem("all tasks"));
    if (!arrayTasks) {
        return;
    }

    const ul = document.getElementById("listOfTasks");

    for (let i = 0; i < arrayTasks.length; i++) {

        // validate task time and date
        const isValidate = isDateAndHourPassed(arrayTasks[i].date);

        if (isValidate) {
            ul.innerHTML +=
                `<li id="li-${i}" class="hover"> 
            <div class="buttonDelete"> 
            <button onclick="deleteTask(${i})"
            id="button-${i}" class="close-button">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 
            </button>
            </div>
            <p class="textListItem">
            ${arrayTasks[i].text} 
            </p>
            <p class="dateListItem">
            ${arrayTasks[i].date} 
            </p>
            <p class="timeListItem">
            ${arrayTasks[i].time}
            </p>
            </li>`
        } else {
            arrayTasks.splice(i, 1);
            i--;
        }

    }
    localStorage.setItem("all tasks", JSON.stringify(arrayTasks));
}

function isDateAndHourPassed(date) {
    const nowIs = new Date();

    const timePassed = new Date(date);

    const isPassed = nowIs < timePassed; //return true or false

    return isPassed;

}



