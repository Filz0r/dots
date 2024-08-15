import workspaces from "./modules/workspaces";

const LeftBar = (monitor = 0) => {
    return Widget.Window({
        name: `left-bar-${monitor}`, // name has to be unique
        monitor,
        anchor: ["left", "top", "bottom"],
        exclusivity: "exclusive",
        // vpack: "end",
        // hpack: "start",
        vexpand: true,
        // margins: [0, 2, 0, 0],
        child: Widget.Box({
            vertical: true,
            className: "left-bar",
            children: [
                workspaces(),
                // Widget.Box({
                //     css:"padding:1px; background-color:red",
                // })
            ]
        }),
    })
};

export default LeftBar;