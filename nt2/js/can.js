const monthSelect = document.getElementById("month");
const calendarBody = document.querySelector("#calendar tbody");

function renderCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDayIndex = new Date(year, month, daysInMonth).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const nextMonthDays = 7 - lastDayIndex - 1;

  let html = "";

  for (let i = firstDayIndex; i > 0; i--) {
    html += `<td class="inactive">${prevMonthDays - i + 1}</td>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    if (
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      html += `<td class="today">${i}</td>`;
    } else {
      html += `<td class="active">${i}</td>`;
    }

    if ((i + firstDayIndex) % 7 === 0 && i !== daysInMonth) {
      html += "</tr><tr>";
    } else if (i === daysInMonth && lastDayIndex < 6) {
      const remainingCells = 7 - lastDayIndex - 1;
      for (let j = 0; j < remainingCells; j++) {
        html += '<td class="inactive"></td>';
      }
    }
  }

  calendarBody.innerHTML = html;

  const inactiveCells = document.querySelectorAll(".inactive");
  inactiveCells.forEach((cell) => {
    cell.style.color = "transparent";
  });
}

function updateCalendar() {
  const selectedYear = new Date().getFullYear();
  const selectedMonth = parseInt(monthSelect.value);
  renderCalendar(selectedYear, selectedMonth);
}

monthSelect.addEventListener("change", updateCalendar);

updateCalendar();
