
const topBarLeft = () => {
    return Widget.Box({
        hpack: "start",
        spacing: 50,
        children: [
            media(),
            clientTitle(),
        ],
    })
};

const topBarCenter = () => {
    return Widget.Box({
        hpack: "center",
        spacing: 8,
        children: [
            weather(),
            notificationCenter(),
        ],
    })
}

const topBarRight = () => {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            systemTray(),
            connectionMenu(),
            powerMenu(),
        ],
    })
}


const TopBar = (monitor = 0) => {
    return Widget.Window({
        name: `top-bar-${monitor}`, // name has to be unique
        class_name: "top-bar",
        monitor,
        anchor: ["left", "top", "bottom"],
        exclusivity: "exclusive",
        child: Widget.Box({
            vertical: true,
            spacing: 100,
            children: [
                topBarLeft(),
                topBarCenter(),
                topBarRight()
            ],
        }),
    })
};

export { TopBar };