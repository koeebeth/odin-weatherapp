async function getCurWeather(location){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2dba2dd8ec534059a89172222230908&q=${location}`,{
        mode: 'cors',
    })
    .catch((error) => console.log(error));
    const weather = await response.json();

    return weather;
}

async function getForecast(location){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2dba2dd8ec534059a89172222230908&q=${location}&days=3`, {
        mode: 'cors',
    })
    .catch((error) => console.log(error));
    const forecast = await response.json();
    return forecast;
}


export {getCurWeather, getForecast}