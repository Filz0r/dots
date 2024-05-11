import { Button } from "resource:///com/github/Aylur/ags/widgets/button.js";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
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

const defaultIcon = () => Widget.Icon({
    icon: distroIcon,
    className: 'default-workspace-icon',
    size: iconSize,
});

const generateWorkspaceButton = (ws : Workspace) => {
    const { id } = ws;
    if (ws.windows < 1)
        return Widget.Button({
            attribute: { id },
            className: "workspace-button",
            child: defaultIcon(),
            onClicked: (w) => dispatchWorkspace(ws.id),
        });
    // console.log(hyprland.clients)
    return Widget.Box({
            attribute: { id },
            className: "workspace-wrapper",
            vertical: true,
            children: hyprland.clients.map(c => {
                if (c.workspace.id === ws.id)
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
let lastAddr;
function updateWorkspaces<T extends { attribute: {id :number}}>(arr :T[], id :number) {
    return arr.map((elem) => console.log(elem.attribute));
    // console.log(arr);
    // arr.forEach((elem) => {
    //     lastAddr = elem.child.attribute.address;
    //     console.log(elem.child.attribute.address)
    //     console.log(elem.child.class_name)
    //     if (elem.child.attribute.address !== lastAddr)
    //         console.log(elem.child.attribute.address)
    // });

}

const workspaces = () => {
    let activeWorkspace = hyprland.active.workspace.id;
    // console.log(hyprland.workspaces);
    return Widget.Box({
        homogeneous: false,
        vertical: true,
        spacing: 8,
        className: "workspaces",
        children: sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w))),
        setup: (w) => {
            w.hook(hyprland.active.client, (w) => {
                w.children.forEach(m => console.log(m.attribute));
                // if (typeof address === "string")
                //     w.children = w.children.filter(ch => ch.attribute.address)
            }, 'changed')
            // hyprland.connect("changed", (s) => console.log(s));
            // w.hook(hyprland.active.client, (self, ...arr) => {
            //     print("event");
            //     // console.log(self)
            //     updateWorkspaces(w.children, 1);
            //     // w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w)));
            // });
            // w.hook(hyprland, (w, ...args) => {
            //     // console.log("self:", w);
            //     // console.log("args: ", args);
            //     print("changed");
            //     updateWorkspaces(w.children);
            // }, "changed")
            // hyprland.connect("client-added", (h) => {
            //     console.log("________1");
            //     console.log(h)
            //     w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w)));
            // })
            // hyprland.connect("client-removed", (hm) => {
            //     console.log("________2");
                // console.log(hm)
                // w.children = sortWorkspaces(hyprland.workspaces.map(w => generateWorkspaceButton(w)));
            // })
        }
    });
}



export default workspaces