const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendarBody');

// Get the current date
let currentDate = new Date();

// Event listeners for previous and next buttons
prevBtn.addEventListener('click', showPreviousMonth);
nextBtn.addEventListener('click', showNextMonth);

// Display the current month and year
showCalendar(currentDate);

// Function to display the calendar for a given month
function showCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Display the month and year in the header
  monthYear.textContent = `${getMonthName(month)} ${year}`;

  // Get the first day and the total number of days in the month
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Clear the calendar body
  calendarBody.innerHTML = '';

  // Fill in the calendar dates
  let dateCount = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        // Empty cells before the first day
        cell.textContent = '';
      } else if (dateCount > totalDays) {
        // Empty cells after the last day
        cell.textContent = '';
      } else {
        // Fill in the calendar with dates
        cell.textContent = dateCount;
        if (isToday(year, month, dateCount)) {
          // Highlight today's date
          cell.classList.add('today');
        }
        dateCount++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

// Function to show the previous month
function showPreviousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalendar(currentDate);
}

// Function to show the next month
function showNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalendar(currentDate);
}

// Function to get the name of the month
function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return months[month];
}

// Function to check if a date is today's date
function isToday(year, month, date) {
  const today = new Date();
  return (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    date === today.getDate()
  );
}

// Function to update the calendar dynamically
function updateCalendar() {
  const today = new Date();
  if (currentDate.getMonth() !== today.getMonth() || currentDate.getFullYear() !== today.getFullYear()) {
    currentDate = today;
    showCalendar(currentDate);
  } else {
    const cells = document.querySelectorAll('#calendarBody td');
    cells.forEach((cell) => {
      const date = parseInt(cell.textContent);
      if (isToday(currentDate.getFullYear(), currentDate.getMonth(), date)) {
        cell.classList.add('today');
      } else {
        cell.classList.remove('today');
      }
    });
  }
}

// Update the calendar every second
setInterval(updateCalendar, 1000)