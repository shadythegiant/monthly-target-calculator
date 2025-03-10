"use strict";

// Main form constants

const form = document.getElementById("form");
const targetCount = document.getElementById("target");
const targetPercent1 = document.getElementById("calc-target");
const targetPercent2 = document.getElementById("calc-target-2");
const error = document.querySelector(".error-message");

targetCount.addEventListener("change", () => {
  if (isNaN(+targetCount.value)) {
    error.classList.add("active");
  } else {
    error.classList.remove("active");
  }
});

// calendar form constants
const datepicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
const yearInput = datepicker.querySelector(".year-input");
const monthInput = datepicker.querySelector(".month-input");
const cancelBtn = datepicker.querySelector(".cancel");
const applyBtn = datepicker.querySelector(".apply");
const nextBtn = datepicker.querySelector(".next");
const prevBtn = datepicker.querySelector(".prev");
const dates = datepicker.querySelector(".dates");

let selectedDate = new Date();
let selectedDays;
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

// show datepicker
dateInput.addEventListener("click", () => {
  if (targetCount.value === "") return;
  datepicker.hidden = false;
});

// hide datepicker
cancelBtn.addEventListener("click", () => {
  datepicker.hidden = true;
});

// handle apply button click event
applyBtn.addEventListener("click", () => {
  dateInput.value = selectedDays.length + 1;
  targetPercent1.value = `${
    Number(targetCount.value) * Number(dateInput.value)
  } Tasks`;
  targetPercent2.value = `${Math.floor(
    Number(targetCount.value) * Number(dateInput.value) * 1.1
  )} Tasks`;
  // hide datepicker
  datepicker.hidden = true;
  targetCount.value = "";
  dateInput.value = "";
});

// handle next month nav
nextBtn.addEventListener("click", () => {
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

// handle prev month nav
prevBtn.addEventListener("click", () => {
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

// handle month input change event
monthInput.addEventListener("change", () => {
  month = monthInput.selectedIndex;
  displayDates();
});

// handle year input change event
yearInput.addEventListener("change", () => {
  year = yearInput.value;
  displayDates();
});

const updateYearMonth = () => {
  monthInput.selectedIndex = month;
  yearInput.value = year;
};

const handleDateClick = (e) => {
  const button = e.target;

  // remove the 'selected' class from other buttons
  selectedDays = dates.querySelectorAll(".selected");
  //   selected && selected.classList.remove("selected");

  // toggle the 'selected' class to current button
  button.classList.toggle("selected");

  // set the selected date
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

// render the dates in the calendar interface
const displayDates = () => {
  // update year & month whenever the dates are updated
  updateYearMonth();

  // clear the dates
  dates.innerHTML = "";

  //* display the last week of previous month

  // get the last date of previous month
  const lastOfPrevMonth = new Date(year, month, 0);

  for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
    const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    const button = createButton(text, true, -1);
    dates.appendChild(button);
  }

  //* display the current month

  // get the last date of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    dates.appendChild(button);
  }

  //* display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);

  for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;

    const button = createButton(text, true, 1);
    dates.appendChild(button);
  }
};

const createButton = (text, isDisabled = false, type = 0) => {
  const currentDate = new Date();

  // determine the date to compare based on the button type
  let comparisonDate = new Date(year, month + type, text);

  // check if the current button is the date today
  const isToday =
    currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  // check if the current button is selected
  const selected = selectedDate.getTime() === comparisonDate.getTime();

  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday && !isDisabled);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
