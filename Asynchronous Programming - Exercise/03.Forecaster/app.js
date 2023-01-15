const enumIcon = {
    "Sunny": "&#x2600", // ☀
    "Partly sunny": "&#x26C5", // ⛅
    "Overcast": "&#x2601", // ☁
    "Rain": "&#x2614", // ☂
    "Degrees": "&#176"   // °

};

function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
}

async function getWeather() {
    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    try {
        let townName = document.getElementById('location').value;

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';

        const response = await fetch(url);
        const towns = await response.json();

        let townInfo = towns.find(t => t.name === townName);

        const [todayData, upcomingData] = await Promise.all([
            getTodayWeather(townInfo.code),
            getThreeDayWeather(townInfo.code)
        ]);

        forecastDiv.style.display = 'block';

        let todayHtml = createTodayHtml(todayData);
        currentDiv.appendChild(todayHtml);

        let upcomingHtml = createUpcomingHtml(upcomingData);
        upcomingDiv.appendChild(upcomingHtml);
    }
    catch {
        forecastDiv.style.display = 'block';
        document.querySelector('.label').textContent = 'Error'
    }
}

async function getTodayWeather(code) {
    const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

    const responseToday = await fetch(urlToday);
    const todayData = await responseToday.json();

    return todayData;
}

async function getThreeDayWeather(code) {
    const urlThreeDay = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    const responseThreeDay = await fetch(urlThreeDay);
    const threeDayData = await responseThreeDay.json();

    return threeDayData;
}

function createTodayHtml(todayData) {
    let { condition, high, low } = todayData.forecast;

    let conditionDiv = document.createElement('div');
    conditionDiv.classList.add('forecasts');

    let symbolSpan = document.createElement('span');
    symbolSpan.classList.add('condition', 'symbol');
    symbolSpan.innerHTML = enumIcon[condition];

    let mainSpan = document.createElement('span');
    mainSpan.classList.add('condition');

    let spanTown = document.createElement('span');
    spanTown.classList.add('forecast-data');
    spanTown.textContent = todayData.name;

    let spanTemp = document.createElement('span');
    spanTemp.classList.add('forecast-data');
    spanTemp.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`;

    let spanCondition = document.createElement('span');
    spanCondition.classList.add('forecast-data');
    spanCondition.textContent = condition;

    mainSpan.appendChild(spanTown);
    mainSpan.appendChild(spanTemp);
    mainSpan.appendChild(spanCondition);
    conditionDiv.appendChild(symbolSpan);
    conditionDiv.appendChild(mainSpan);

    return conditionDiv;
}

function createUpcomingHtml(upcomingData) {
    let upcomingDiv = document.createElement('div');
    upcomingDiv.classList.add('forecast-info');

    upcomingData.forecast.forEach(data => {
        let spanElement = createUpcomingSpans(data.condition, data.high, data.low);

        upcomingDiv.appendChild(spanElement);
    });

    return upcomingDiv;
}

function createUpcomingSpans(condition, high, low) {
    let mainSpan = document.createElement('span');
    mainSpan.classList.add('upcoming');

    let symbolSpan = document.createElement('span');
    symbolSpan.classList.add('symbol');
    symbolSpan.innerHTML = enumIcon[condition];

    let spanTemp = document.createElement('span');
    spanTemp.classList.add('forecast-data');
    spanTemp.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`;

    let spanCondition = document.createElement('span');
    spanCondition.classList.add('forecast-data');
    spanCondition.textContent = condition;

    mainSpan.appendChild(symbolSpan);
    mainSpan.appendChild(spanTemp);
    mainSpan.appendChild(spanCondition);

    return mainSpan;
}

attachEvents();