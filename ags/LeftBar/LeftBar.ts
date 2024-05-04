import workspaces from "./modules/workspaces";
import clock from "./modules/clock";
import lockButton from "./modules/lockButton";
import batteryMenu from "./modules/batteryMenu";


const leftBarTop = () => {
    return Widget.Box({
        hpack: "start",
        // vpack: "center",
        spacing: 50,
        children: [
            workspaces(),
        ],
    })
};

const leftBarCenter = () => {
    return Widget.Box({
        hpack: "center",
        // vpack: "center",
        spacing: 50,
        children: [
            clock(),
        ],
    })
}

const leftBarBottom = () => {
    return Widget.Box({
        hpack: "end",
        // vpack: "center",
        spacing: 50,
        children: [
            lockButton(),
            batteryMenu(),
        ],
    })
}


const LeftBar = (monitor = 0) => {
    return Widget.Window({
        name: `left-bar-${monitor}`, // name has to be unique
        class_name: "left-bar",
        monitor,
        anchor: ["left", "top", "bottom"],
        exclusivity: "exclusive",
        // vpack: "center",
        // margins: [0, 2, 0, 0],
        child: Widget.Box({
            vertical: true,
            homogeneous: true,
            spacing: 250,
            children: [
                leftBarTop(),
                leftBarCenter(),
                leftBarBottom()
            ],
        }),
    })
};

export { LeftBar };