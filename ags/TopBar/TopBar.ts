import openApplications from "./modules/openApplications";
import systemTray from "./modules/systemTray";
import clock from "../TopBar/modules/clock";


const topBarLeft = () => {
    return Widget.Box({
        className: "top-bar-left",
        hpack: "start",
        vpack: "start",
        children: [
            // media(),
            // openApplications(),
        ],
    })
};

const topBarCenter = () => {
    return Widget.Box({
        className: "top-bar-center",
        hpack: "center",
        vpack: "center",
        children: [
            clock(),
            // weather(),
            // notificationCenter(),
        ],
    })
}

const topBarRight = () => {
    return Widget.Box({
        className: "top-bar-right",
        vpack: "end",
        hpack: "end",
        children: [
            // connectionMenu(),
            systemTray(),
            // powerMenu(),
        ],
    })
}


const TopBar = (monitor = 0) => {
    return Widget.Window({
        name: `top-bar-${monitor}`, // name has to be unique
        class_name: "top-bar",
        monitor,
        anchor: ["left", "top", "right"],
        exclusivity: "exclusive",
        child: Widget.Box({
            vertical: false,
            homogeneous: true,
            spacing: 250,
            children: [
                topBarLeft(),
                topBarCenter(),
                topBarRight()
            ],
        }),
    })
};

export default TopBar ;