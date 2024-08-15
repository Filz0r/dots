import {hours, minutes} from "../../../utils/variables";


const clock = () => {
    const hourLabel = Widget.Label({
        class_name: "clock-hours",
        label: hours.bind(),
    });

    const minuteLabel = Widget.Label({
        class_name: "clock-minutes",
        label: minutes.bind(),
    });

    return Widget.Box({
        class_name: "clock",
        // vertical: true,
        children: [
            hourLabel,
            minuteLabel
        ]
    })
}

export default clock;