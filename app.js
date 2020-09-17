const api = {
    key: "8d07b38c65520c34147973fb3d1eee60",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);


window.addEventListener('load', (ontario) =>{
    fetch(`${api.base}weather?q=ontario&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
});


function setQuery (e) {
    if (e.keyCode == 13 ){
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather){
    //console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>f</span>`;

    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerHTML = `${weather.weather[0].main}`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)} f / ${Math.round(weather.main.temp_max)} f`;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}