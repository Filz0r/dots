import workspaces from "./modules/workspaces";
import lockButton from "./modules/lockButton";
import batteryMenu from "./modules/batteryMenu";


const leftBarTop = () => {
    return Widget.Box({
        hpack: "start",
        vpack: "start",
        vertical: true,
        children: [
            workspaces(),
            batteryMenu(),
            lockButton(),
        ],
    })
};

const leftBarCenter = () => {
    return Widget.Box({
        hpack: "center",
        vpack: "center",
        vertical: true,
        children: [
        ],
    })
}

const leftBarBottom = () => {
    return Widget.Box({
        className: "left-bar-bottom",
        hpack: "end",
        vpack: "end",
        vertical: true,
        children: [
            batteryMenu(),
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
        // vpack: "center",
        // margins: [0, 2, 0, 0],
        child: Widget.Box({
            vertical: true,
            // homogeneous: true,
            spacing: 250,
            children: [
                leftBarTop(),
                // leftBarCenter(),
                // leftBarBottom()
            ],
        }),
    })
};

export default LeftBar;