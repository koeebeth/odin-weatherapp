import './style/style.scss'
import * as asyncf from './js/async-funcs.js';
import * as domf from './js/dom-funcs.js';

let unit = 'm';

const exData = {"location":{"name":"Tokyo","region":"Tokyo","country":"Japan","lat":35.69,"lon":139.69,"tz_id":"Asia/Tokyo","localtime_epoch":1691738170,"localtime":"2023-08-11 19:16"},"current":{"last_updated_epoch":1691737200,"last_updated":"2023-08-11 16:00","temp_c":33,"temp_f":91.4,"is_day":1,"condition":{"text":"Partly cloudy","icon":"//cdn.weatherapi.com/weather/64x64/day/116.png","code":1003},"wind_mph":9.4,"wind_kph":15.1,"wind_degree":50,"wind_dir":"NE","pressure_mb":1005,"pressure_in":29.68,"precip_mm":0,"precip_in":0,"humidity":53,"cloud":75,"feelslike_c":36,"feelslike_f":96.7,"vis_km":10,"vis_miles":6,"uv":8,"gust_mph":18.8,"gust_kph":30.2}}
