import options from "utils/options";
import  {dispatchWorkspace} from "utils/hyprfaces";
import {range} from "utils/utils";
import Gtk from "@girs/gtk-3.0";
import {Button} from "types/widgets/button";
import {Icon} from "types/widgets/icon";

const { openApps: iconSize } = options.sizes;
const {distroIcon} = options.icons;
const hyprland = await Service.import("hyprland");
const apps = await Service.import("applications");

const getWsIcon = (id :number): Icon<number> => Widget.Icon({
        attribute: id,
        icon: getIconString(id),
        name: getIconString(id),
        size: iconSize,
        // className: "app-list-icon",
});

const getWsButton = (id :number) => {
    const activeWs = hyprland.active.workspace.id;
    const boxClass: string = "workspace-btn";
    return Widget.Button({
        attribute: id,
        child: getWsIcon(id),
        className: id === activeWs ? boxClass + " focused" : boxClass,
        name: `workspace-${id}`,
        onClicked: () => dispatchWorkspace(id),
        visible: hyprland.getWorkspace(id)?.windows === 0 || false,
    })
}

const getIconString = (id :number) :string => {
    const ws = hyprland.getWorkspace(id);
    let address = ws?.lastwindow;
    if (!address)
        return distroIcon;
    const client = hyprland.getClient(address);
    if (!client)
        return distroIcon;
    const app = apps.list.find(app => app.match(client.class));
    if (!app)
        return distroIcon;
    return app.icon_name || distroIcon;
}

const getWsButtons = (size :number) :Gtk.Widget[] => {
    return range(size).map(i => getWsButton(i)) as unknown as Gtk.Widget[];
}

const updateButton = (button :Button<Icon<number>, number>, callback :(param :number) => Icon<number>) => {
    const tempWs = hyprland.getWorkspace(button.attribute);
    const activeWs = hyprland.active.workspace.id;
    const boxClass: string = "workspace-btn";
    button.class_name = button.attribute === activeWs ? boxClass + " focused" : boxClass;
    button.child.icon_name = getIconString(button.attribute);
    button.visible = !!(tempWs && tempWs.windows >= 0);
};

const workspaces = () =>  {
    // const wsBar =
        return Widget.Box({
            vertical: true,
            name: "workspace_bar",
            className: "workspaces",

            // homogeneous: true,
            children: getWsButtons(10),
            setup: (w) => { w
                .hook(hyprland.active, self => {
                    self.children.forEach(child =>
                        updateButton(child as Button<Icon<number>, number>, getWsIcon))
                }, "changed")
                .hook(hyprland, self => {
                    self.children.forEach(child =>
                        updateButton(child as Button<Icon<number>, number>, getWsIcon))
                }, "client-added")
                .hook(hyprland, self => {
                    self.children.forEach(child =>
                        updateButton(child as Button<Icon<number>, number>, getWsIcon))
                }, "client-removed")
                .hook(hyprland, self => {
                    self.children.forEach(child =>
                        updateButton(child as Button<Icon<number>, number>, getWsIcon))
                }, "workspace-removed")
                .hook(hyprland, self => {
                    self.children.forEach(child =>
                        updateButton(child as Button<Icon<number>, number>, getWsIcon))
                }, "workspace-added")
            }
        })
}



export default workspaces