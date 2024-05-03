import workspaces from "./modules/workspaces";
import clock from "./modules/clock";
import lockButton from "./modules/lockButton";
import batteryMenu from "./modules/batteryMenu";


const leftBarTop = () => {
    return Widget.Box({
        hpack: "start",
        spacing: 50,
        children: [
            workspaces(),
        ],
    })
};

const leftBarCenter = () => {
    return Widget.Box({
        hpack: "center",
        spacing: 8,
        children: [
            clock(),
        ],
    })
}

const leftBarBottom = () => {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            // batteryMenu(),
            lockButton(),
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
        child: Widget.Box({
            vertical: true,
            spacing: 100,
            children: [
                leftBarTop(),
                leftBarCenter(),
                leftBarBottom()
            ],
        }),
    })
};

export { LeftBar };