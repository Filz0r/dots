import options from "../../utils/options";

const { openApps: iconSize } = options.sizes;

const hyprland = await Service.import("hyprland")
const apps = await Service.import("applications");

const changeToWindow = (address: string) => {
    hyprland.messageAsync(`dispatch focuswindow address:${address}`);
}

const dummyItem = (address : string) => Widget.Box({
    attribute: {address},
    visible: false,
});

const appItem = (address : string) => {
    // console.log(address);
    const client = hyprland.getClient(address);
    if (!client || client.class === ""){
        console.log("uh?")
        return dummyItem(address);
    }

    const app = apps.list.find(app => app.match(client.class));
    return Widget.Button({
        className: "app-list-icon",
        onClicked: () => changeToWindow(client.address),
        child: Widget.Icon({
            icon: app?.bind("icon_name").as(a => a || `${client.class}-application-x-executable`),
            size: iconSize,
        })
    })
}

const openApplications = ()  => {
    // let test = hyprland.active
    // console.log(test)
    return Widget.Box({
        class_name: "open-applications",
        children: hyprland.clients.map(c => appItem(c.address)),
        setup: w => w
            .hook(hyprland, (w, address ?:string) => {
                if (typeof address === "string")
                    w.children = hyprland.clients.map(c => appItem(c.address))
            }, "client-removed")
            .hook(hyprland, (w, address ?:string) => {
                if (typeof address === "string")
                    w.children = hyprland.clients.map(c => appItem(c.address))
            }, "client-added")
    });
}

export default openApplications;