const temperature = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const image = document.querySelector(".weather3 img");
const searchfield = document.querySelector(".searchfield");
const form = document.querySelector("form");

let target = "new delhi";
const fetchdata = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=90777557ce564fc685b101501231808&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    const {
      current: {
        temp_c,
        condition: {  icon },
      },
      location: { name, localtime },
    } = data;
    update(temp_c, name, localtime, icon);
  } catch (error) {
    alert("Location Invalid");
  }
};
function update(temperate, city, time, icon) {
  temperature.innerText = temperate+"°";
  cityfield.innerText = city;
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();
  datefield.innerText = `${exactTime}-${getday(exactDay)}-${exactDate}`;
  image.src = icon;
}
function getday(num) {
  switch (num) {
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
      return "Invalid";
  }
}
fetchdata(target);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  target = searchfield.value;
  fetchdata(target);
});
