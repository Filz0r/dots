import { tray, notification } from "./modules.js";

const topBarLeft = () => {

}

const topBarCenter = () => {
    return Widget.Box({
        hpack: "center",
        spacing: 8,
        children: [
            notification(),
        ],
    })
}

const topBarRight = () => {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            tray(),
        ],
    })
}


const topBar = (monitor = 0) => {
    return Widget.Window({
        name: `left-bar-${monitor}`, // name has to be unique
        class_name: "left-bar",
        monitor,
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            start_widget: topBarLeft(),
            center_widget: topBarCenter(),
            end_widget: topBarRight(),
        }),
    })
};

export { topBar };