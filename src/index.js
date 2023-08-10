import './style/style.scss'
import * as asyncf from './js/async-funcs.js';
import * as domf from './js/dom-funcs.js';

let data = asyncf.getCurWeather('tokyo');
data.then((result) => {
    domf.renderCurWeather(result)
    console.log(result);
})