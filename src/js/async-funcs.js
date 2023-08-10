async function getCurWeather(location){
    let weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=2dba2dd8ec534059a89172222230908&q=${location}`)
    .then((response => response.json()))
    .catch((error) => console.log(error));
    return weather;
}


export {getCurWeather}