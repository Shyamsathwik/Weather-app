const temperatureField = document.querySelector(".temp-value");
const LocationField = document.querySelector(".location-name");
const dataField = document.querySelector(".time-data");
const conditionField = document.querySelector(".condition-value");
const searchField = document.querySelector(".search_area");
const form = document.querySelector(".form");

// Default target location
let target = "delhi";

// Fetch weather data from the API
const fetchResults = async (targetlocation) => {
  try {
    let url = `https://api.weatherapi.com/v1/current.json?key=b5c20f2ba6194eebac2123012241812&q=${targetlocation}&aqi=no`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data. Please check the location.");
    }

    const data = await res.json();

    let LocationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, LocationName, time, condition);
  } catch (error) {
    alert(error.message);
    console.error("Error fetching weather data:", error);
  }
};

// Update weather details in the DOM
function updateDetails(temp, LocationName, time, condition) {
  const [date, clockTime] = time.split(" ");
  const currentDay = new Date(date).getDay();
  const dayName = getDayName(currentDay);

  temperatureField.innerText = `${temp}°C`;
  LocationField.innerText = LocationName;
  dataField.innerText = `${clockTime} - ${dayName}, ${date}`;
  conditionField.innerText = condition;
}

// Handle form submission to search for a location
function searchForLocation(e) {
  e.preventDefault();
  if (!searchField.value.trim()) {
    alert("Please enter a location");
    return;
  }
  target = searchField.value.trim();
  fetchResults(target);
}

// Add event listener to the form
form.addEventListener("submit", searchForLocation);

// Initial fetch for default location
fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
}