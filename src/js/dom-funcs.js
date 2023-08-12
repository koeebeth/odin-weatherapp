import { format } from 'date-fns';

function renderCurWeather(data, unit = 'm') {
    //Render main part
    //Selectors
    const body = document.querySelector('body');
    const curDiv = document.querySelector('div.container.current');
    const detailsDiv = document.querySelector('div.curcondition-details')
    const location = curDiv.querySelector('h3.location');
    const temp = curDiv.querySelector('h2.cur-temp');
    const condition = curDiv.querySelector('h3.cur-condition');
    const conditionIcon = curDiv.querySelector('h3.icon');
    const humidity = detailsDiv.querySelector('div.humidity').querySelector('span');
    const feelsLike = detailsDiv.querySelector('div.feels-like').querySelector('span');
    const windSpeed = detailsDiv.querySelector('div.wind-speed').querySelector('span');
    const dateEl = curDiv.querySelector('h3.datetime');

    //Format date and time
    const [, localtime ] = data.location.localtime.split(' ');
    const localhour = parseInt(localtime.substr(0, 2));
    const fmtedDate = format(Date.parse(data.location.localtime), 'eeee, MMM d, p')

    //Change background color based on time
    if(localhour >= 6 && localhour < 12){
        body.dataset.time = 'morning';
    }
    else if(localhour >= 12 && localhour < 18){
        body.dataset.time = 'midday';
    }
    else if(localhour >= 18 && localhour < 21){
        body.dataset.time = 'sunset';
    }
    else {
        body.dataset.time = 'night';
    }

    //Change text content
    location.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = unit === 'm' ? `${Math.round(data.current.temp_c)}°C` : `${Math.round(data.current.temp_f)}°F`;
    condition.textContent = data.current.condition.text;
    conditionIcon.innerHTML = getIcon(data.current.condition.code);
    humidity.textContent = `${data.current.humidity}%`;
    feelsLike.textContent = unit === 'm' ? `${Math.round(data.current.feelslike_c)}°C` : `${Math.round(data.current.feelslike_f)}°F`;
    windSpeed.textContent = unit === 'm' ? `${Math.round(data.current.wind_kph)}km/h` : `${Math.round(data.current.wind_mph)}mph`;
    dateEl.textContent = fmtedDate;

}


function renderForecast(data, unit = 'm'){
    const hi = document.querySelector('span.hi');
    const lo = document.querySelector('span.lo');
    const forecastDiv = document.querySelector('.forecast');
    const forecastDays = data.forecast.forecastday;

    if(unit === 'm'){
        hi.textContent = Math.round(forecastDays[0].day.maxtemp_c);
        lo.textContent = Math.round(forecastDays[0].day.mintemp_c);
    }
    else{
        hi.textContent = Math.round(forecastDays[0].day.maxtemp_f);
        lo.textContent = Math.round(forecastDays[0].day.mintemp_f);
    }

    forecastDiv.textContent = '';

    for (const day of forecastDays){
        const dayDiv = document.createElement('div');

        const icon = document.createElement('div');
        const tmp = document.createElement('h4');
        const weekday = document.createElement('h4');

        dayDiv.classList.add('day');
        tmp.classList.add('forecast-temp');
        weekday.classList.add('forecast-day');

        icon.innerHTML = getIcon(day.day.condition.code);
        tmp.textContent = unit === 'm' ? Math.round(day.day.avgtemp_c) : Math.round(day.day.avgtemp_f);
        weekday.textContent = format(Date.parse(day.date), 'ccc');


        dayDiv.appendChild(icon);
        dayDiv.appendChild(tmp);
        dayDiv.appendChild(weekday);
        forecastDiv.appendChild(dayDiv);
    }

}


//Get svg icon from code
function getIcon(code){
    const windyIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M461-160q-42 0-71-21.5T351-241q-3-13 6-23t24-10q9 0 17.5 7t14.5 19q6 14 18.5 21t29.5 7q24 0 39-15t15-39q0-24-15-39t-39-15H110q-13 0-21.5-8.5T80-358q0-13 8.5-21.5T110-388h351q50 0 82 32t32 82q0 50-32 82t-82 32ZM110-568q-13 0-21.5-8.5T80-598q0-13 8.5-21.5T110-628h513q35 0 55.5-20.5T699-704q0-35-20.5-55.5T623-780q-28 0-44.5 12.5T555-735q-4 12-12.5 19.5T523-708q-14 0-22.5-10t-5.5-22q10-41 43-70.5t85-29.5q57 0 96.5 39.5T759-704q0 57-39.5 96.5T623-568H110Zm670 321q-12 2-22-6.5T748-276q0-11 7.5-19.5T775-308q22-7 33.5-24t11.5-44q0-35-18.5-53.5T748-448H110q-13 0-21.5-8.5T80-478q0-13 8.5-21.5T110-508h638q59 0 95.5 36.5T880-376q0 51-27 85t-73 44Z"/></svg>';
    const nightIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M524-40q-84 0-157.5-32t-128-86.5Q184-213 152-286.5T120-444q0-146 93-257.5T450-840q-18 98 11 192.635 29 94.635 100 165.736 71 71.101 165.5 100.143Q821-352.445 920-370.471q-26 144.206-138 237.338Q670-40 524-40Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T518.5-440Q455-503 422-585.5T381-757q-88 48-144.5 130.5T180-444q0 143.333 100.333 243.667Q380.667-100 524-100Zm-6-340Z"/></svg>';
    const cloudIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M251-160q-88 0-149.5-61.5T40-371q0-78 50-137t127-71q20-97 94-158.5T482-799q112 0 189 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H251Zm0-60h500q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-91-61-154t-149-63q-88 0-149.5 63T267-522h-19q-62 0-105 43.5T100-371q0 63 44 107t107 44Zm229-260Z"/></svg>';
    const fogIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M720-205q-14 0-24.5-10.5T685-240q0-14 10.5-24.5T720-275q14 0 24.5 10.5T755-240q0 14-10.5 24.5T720-205ZM280-80q-14 0-24.5-10.5T245-115q0-14 10.5-24.5T280-150q14 0 24.5 10.5T315-115q0 14-10.5 24.5T280-80Zm-40-125q-14 0-24.5-10.5T205-240q0-14 10.5-24.5T240-275h360q14 0 24.5 10.5T635-240q0 14-10.5 24.5T600-205H240ZM400-80q-14 0-24.5-10.5T365-115q0-14 10.5-24.5T400-150h280q14 0 24.5 10.5T715-115q0 14-10.5 24.5T680-80H400ZM290-340q-86.864 0-148.432-61.52Q80-463.04 80-549.835 80-629 136.5-691 193-753 277-759q32-56 84.5-88.5T480.423-880Q571-880 632.5-822.5T708-680q79 4 125.5 53.5T880-510.377Q880-440 830.417-390 780.833-340 710-340H290Zm0-60h420q46.2 0 78.1-32.5 31.9-32.5 31.9-78T788.1-588q-31.9-32-78.1-32h-60v-30q0-71-49.5-120.5T480.212-820q-51.481 0-93.847 27.5Q344-765 324-718l-8 18h-28q-62 2-105 45.393t-43 104.464Q140-488 183.929-444 227.857-400 290-400Zm190-210Z"/></svg>';
    const partCloudIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M479.825-770Q467-770 458.5-778.625T450-800v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM685-685q-9-9-9-21.5t9-21.5l63-63q9.067-9 21.533-9Q782-800 791-791q9 9 9 21t-9 21l-64 64q-9 9-21 9t-21-9Zm115 235q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T800-510h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450h-90Zm-51 281-63-63q-9-9-9-21.5t9-21.5q9-9 21.5-9t21.5 9l63 63q9 9.067 9 21.533Q801-178 791.947-169q-9.052 9-21.5 9Q758-160 749-169ZM233-685l-64-64q-9-9-9-21t9-21q8.8-9 20.9-9 12.1 0 21.1 9l64 64q9 9 9 21t-9 21q-9 9-21 9t-21-9Zm7 505h180q33.333 0 56.667-23.265Q500-226.529 500-259.765 500-293 477.237-317 454.475-341 421-341h-44l-18-41q-15.145-35.75-47.6-56.875T240-460q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q100-262 140.833-221q40.834 41 99.167 41Zm0 60q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q57.736 0 105.368 32.5T416-401q60.117 0 101.058 43.589Q558-313.822 558-253q-5 56-44.033 94.5Q474.935-120 420-120H240Zm318-133q-3-15.385-6-30t-6-30q52-20 83-65.538 31-45.539 31-101.324Q660-555 607.5-607.5T480-660q-67.215 0-117.627 42.674Q311.962-574.652 303-509q-16-3-31.5-5.5T240-520q14-88 82.5-144T480-720q100 0 170 70t70 170.342Q720-402 675.5-340 631-278 558-253Zm-77-227Z"/></svg>';
    const rainIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M558-83q-11 5-23.5 1T517-97l-69-138q-5-11-1.5-23.5T461-276q11-5 23.5-1t17.5 15l69 138q5 11 1.5 23.5T558-83Zm240-1q-11 5-23.5 1T757-98l-69-138q-5-11-1.5-23.5T701-277q11-5 23.5-1t17.5 15l69 138q5 11 1.5 23.5T798-84Zm-480 0q-11 5-23.5 1.5T277-97l-69-138q-5-11-1-23.5t15-17.5q11-5 23.5-1.5T263-263l69 139q5 11 1 23t-15 17Zm-28-256q-87 0-148.5-61.5T80-550q0-79 56.5-141T277-759q32-56 84.5-88.5T480-880q91 0 152.5 57.5T708-680q79 4 125.5 53.5T880-510q0 70-49.5 120T710-340H290Zm0-60h420q46 0 78-32.5t32-77.5q0-46-32-78t-78-32h-60v-30q0-71-49.5-120.5T480-820q-51 0-93.5 27.5T324-718l-8 18h-28q-62 2-105 45.5T140-550q0 62 44 106t106 44Zm190-210Z"/></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M479.825-770Q467-770 458.5-778.625T450-800v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM685-685q-9-9-9-21.1 0-12.1 9-20.9l63-64q9.067-9 21.533-9Q782-800 791-791q9 9 9 21t-9 21l-64 64q-9 9-21 9t-21-9Zm115 235q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T800-510h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450h-90ZM479.825-40Q467-40 458.5-48.625T450-70v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-160v90q0 12.75-8.675 21.375Q492.649-40 479.825-40ZM233-685l-64-63q-9-8.87-9-21.435T169.391-791Q178-800 190-800q12 0 21 9l64 64q9 9 9 21t-9 21q-9.273 8-21.636 8Q241-677 233-685Zm516 516-64-64q-9-8.8-9-20.9 0-12.1 9-21.1 8.25-8 20.625-8T727-275l65 63q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q758-160 749-169ZM70-450q-12.75 0-21.375-8.675Q40-467.351 40-480.175 40-493 48.625-501.5T70-510h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T160-450H70Zm99 280.609Q160-178 160-190q0-12 9-21l64-64q8.25-8 20.625-8T275-274.75q9 9 9 21.375T275-232l-63 63q-8.87 9-21.435 9T169-169.391ZM480-240q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-60q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-180Z"/></svg>';
    const snowIcon ='<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M259.859-210Q243-210 231.5-221.641t-11.5-28.5Q220-267 231.641-278.5t28.5-11.5Q277-290 288.5-278.359t11.5 28.5Q300-233 288.359-221.5t-28.5 11.5Zm120 130Q363-80 351.5-91.64 340-103.283 340-120.142t11.641-28.359q11.641-11.5 28.5-11.5t28.359 11.641q11.5 11.641 11.5 28.5T408.359-91.5Q396.718-80 379.859-80Zm120-130Q483-210 471.5-221.641t-11.5-28.5Q460-267 471.641-278.5t28.5-11.5Q517-290 528.5-278.359t11.5 28.5Q540-233 528.359-221.5t-28.5 11.5Zm240 0Q723-210 711.5-221.641t-11.5-28.5Q700-267 711.641-278.5t28.5-11.5Q757-290 768.5-278.359t11.5 28.5Q780-233 768.359-221.5t-28.5 11.5Zm-120 130Q603-80 591.5-91.64 580-103.283 580-120.142t11.641-28.359q11.641-11.5 28.5-11.5t28.359 11.641q11.5 11.641 11.5 28.5T648.359-91.5Q636.718-80 619.859-80ZM290-380q-86.864 0-148.432-61.52Q80-503.04 80-589.835 80-669 136.5-731 193-793 277-799q32-56 84.5-88.5T480.423-920Q571-920 632.5-862.5T708-720q79 4 125.5 53.5T880-550.377Q880-480 830.417-430 780.833-380 710-380H290Zm0-60h420q46.2 0 78.1-32.5 31.9-32.5 31.9-78T788.1-628q-31.9-32-78.1-32h-60v-30q0-71-49.5-120.5T480.212-860q-51.481 0-93.847 27.5Q344-805 324-758l-8 18h-28q-62 2-105 45.393t-43 104.464Q140-528 183.929-484 227.857-440 290-440Zm190-110Z"/></svg>';
    const blizIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m475 0 97-110-80-40 113-130h80l-97 110 80 40L555 0h-80ZM235 0l97-110-80-40 113-130h80l-97 110 80 40L315 0h-80Zm55-340q-86.864 0-148.432-61.52Q80-463.04 80-549.835 80-629 136.5-691 193-753 277-759q32-56 84.5-88.5T480.423-880Q571-880 632.5-822.5T708-680q79 4 125.5 53.5T880-510.377Q880-440 830.417-390 780.833-340 710-340H290Zm0-60h420q46.2 0 78.1-32.5 31.9-32.5 31.9-78T788.1-588q-31.9-32-78.1-32h-60v-30q0-71-49.5-120.5T480.212-820q-51.481 0-93.847 27.5Q344-765 324-718l-8 18h-28q-62 2-105 45.393t-43 104.464Q140-488 183.929-444 227.857-400 290-400Zm190-210Z"/></svg>';

    switch (code) {
        case 1000:
            return sunIcon;
        case 1003:
            return partCloudIcon;
        case 1006:
        case 1009:
            return cloudIcon;
        case 1030:
        case 1135:
            return fogIcon;
        case 1117: 
        case 1273: 
        case 1276: 
        case 1279: 
        case 1283:
            return blizIcon;
        case 1063:
        case 1069:
        case 1150: 
        case 1153: 
        case 1180: 
        case 1183: 
        case 1186: 
        case 1189: 
        case 1192: 
        case 1204: 
        case 1207: 
        case 1240: 
        case 1243: 
        case 1246: 
        case 1249: 
        case 1252:
            return rainIcon;
        default:
            return snowIcon;
    }
}

export {renderCurWeather, renderForecast}