const battery = await Service.import("battery")

const batteryMenu = () => {
    const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
    const icon = battery.bind("percent").as(p =>
        `battery-level${Math.floor(p / 10) * 10}-symbolic`)

    return Widget.Box({
        class_name: "battery",
        visible: battery.bind("available"),
        children: [
            Widget.Icon({ icon }),
            Widget.LevelBar({
                vertical: true,
                widthRequest: 20,
                vpack: "end",
                value,
            }),
        ],
    })
}

export default batteryMenu;