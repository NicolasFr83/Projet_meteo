

// const image = document.querySelectorAll('.js-image');
//     image.forEach(function (image) {
//         setTimeout(function () {
//     image.classList.add('show');
// }, 1000);
// });


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "2f0f4079754d83526e9417b02516b9b0";



weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
        const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }

        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Entrez une ville");
    }
});



async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Impossible de charger les données météo");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
        main: {temp, temp_min, temp_max, humidity}, 
        weather: [{description, id}],
        wind: {speed} } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const tempMinDisplay = document.createElement("p2");
    const tempMaxDisplay = document.createElement("p2")
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    


    cityDisplay.textContent = city;
    humidityDisplay.textContent = `Humidité: ${humidity}%`;
    descDisplay.textContent = description;
    windDisplay.textContent = `Vent à: ${(speed).toFixed(0)}kmh`;
    weatherEmoji.textContent = getWeatherEmoji(id);
    tempDisplay.textContent = `Température actuelle : ${(temp).toFixed(0)}°C`;
    tempMinDisplay.textContent = `Température min : ${(temp_min).toFixed(0)}°C`;
    tempMaxDisplay.textContent = `Température max : ${(temp_max).toFixed(0)}°C`;

    cityDisplay.classList.add("cityDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    tempDisplay.classList.add("tempDisplay");
    tempMinDisplay.classList.add("tempMinDisplay");
    tempMaxDisplay.classList.add("tempMaxDisplay");
    humidityDisplay.classList.add("humiditéDisplay");
    descDisplay.classList.add("descDisplay");
    windDisplay.classList.add("windDisplay");



    card.appendChild(cityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(windDisplay);
    card.appendChild(tempMinDisplay);
    card.appendChild(tempMaxDisplay);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 232):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 321):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId === 801):
            return "🌤️";
        case (weatherId >= 802 && weatherId <= 804):
            return "🌥️";
    
        default:
            return "❓";
    }
}


function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}