const hours = Variable("", {
    poll: [1000, 'date "+%H"'],
});

const minutes = Variable("", {
    poll: [1000, 'date "+%M"'],
});


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