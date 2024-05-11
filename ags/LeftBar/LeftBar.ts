import workspaces from "./modules/workspaces";

const LeftBar = (monitor = 0) => {
    return Widget.Window({
        name: `left-bar-${monitor}`, // name has to be unique
        monitor,
        anchor: ["left", "top", "bottom"],
        exclusivity: "exclusive",
        vpack: "center",
        hpack: "start",
        // margins: [0, 2, 0, 0],
        child: Widget.Box({
            className: "left-bar",
            child: workspaces()
        }),
    })
};

export default LeftBar;