import options from "utils/options";
import  {dispatchWorkspace, changeToWindow} from "utils/hyprfaces";
import {Workspace} from "types/service/hyprland";

const { openApps: iconSize } = options.sizes;
const {distroIcon} = options.icons;
const {distro: fallbackIcon} = options.fallback;
const hyprland = await Service.import("hyprland");
const apps = await Service.import("applications");

const dummyItem = (address : string) => Widget.Box({
    attribute: {address},
    visible: false,
});

const appItem = (address : string) => {
    // console.log(address);
    const client = hyprland.getClient(address);
    if (!client || client.class === "") {
        console.log("uh?")
        return dummyItem(address);
    }

    const app = apps.list.find(app => app.match(client.class));
    // console.log(app);
    return Widget.Button({
        attribute: { address },
        className: "app-list-icon",
        onClicked: () => changeToWindow(client.address),
        child: Widget.Icon({
            icon: app?.bind("icon_name").as(a => a || `${client.class}-application-x-executable`),
            size: iconSize,
        })
    })
}

const defaultButton = (id :number) => Widget.Button({
    attribute: { id },
    className: "app-list-icon",
    child: defaultIcon(),
    onClicked: (w) => dispatchWorkspace(id),
});

const defaultIcon = () => Widget.Icon({
    icon: distroIcon,
    className: 'default-workspace-icon',
    size: iconSize,
});

const generateWorkspaceButton = (id : number) => {
    const ws = hyprland.getWorkspace(id);
    if ( !ws|| ws.windows < 1)
        return Widget.Box({
            attribute: { id },
            className: "workspace-wrapper",
            child: defaultButton(id),
        });
    // console.log(hyprland.clients)
    return Widget.Box({
            attribute: { id },
            className: "workspace-wrapper",
            vertical: true,
            children: hyprland.clients.map(c => {
                if (c.workspace.id === id)
                    return appItem(c.address)
                else
                    return dummyItem(c.address)
            }),
        })
}

function sortWorkspaces<T extends { attribute: { id :number}}>(arr: T[]) {
    // arr.forEach(w => console.log(w.attribute))
    return arr.sort(({attribute: a}, {attribute: b}) => {
        return a.id - b.id;
    });
}

const workspaces = () =>  Widget.Box({
        homogeneous: false,
        vertical: true,
        spacing: 3,
        className: "workspaces",
        children: sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w.id))),
        setup: (w) => w
                .hook(hyprland, (w, id?: number) => {
                    console.log("here2")
                    console.log(id);
                    w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w.id)))
                 }, "client-removed")
                .hook(hyprland, (w, id?: number) => {
                    console.log("here")
                    console.log(id);
                    w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w.id)))
                }, "client-added")
                .hook(hyprland, (w, id?: number) => {
                    w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w.id)))
                }, "workspace-added")
                // .hook(hyprland, (w, event?: string) => {
                //    console.log(event);
                // }, "event")
                .hook(hyprland, (w, event?: string) => {
                    console.log(event);
                    if (typeof event === "string") {
                        if (event === "createworkspace" || event === "destroyworkspace") {
                            w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w.id)))
                        }
                    }
                }, "event")
});



export default workspaces