import {currentWeather} from "../../../utils/variables";

const WeatherTooltip = () => {
    return Widget.Label({
        className: "weather-tooltip",
    }).hook(currentWeather, (s) =>{
        if (currentWeather.value === 'Down :(')
            s.visible = false;
        else if (!s.visible)
            s.visible = true;
        s.label = currentWeather.value;
    });
}

export default WeatherTooltip;