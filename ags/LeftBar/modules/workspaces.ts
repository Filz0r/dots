import { Button } from "resource:///com/github/Aylur/ags/widgets/button.js";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

const hyprland = await Service.import("hyprland")

const getWorkspaceIcon = (workspace: number): string => {

    let workspaceObj: number | undefined = hyprland.getWorkspace(workspace + 1)?.windows;

    if (workspaceObj === undefined || workspaceObj === 0)
        return ``;
    else if (workspaceObj != undefined && workspaceObj > 0)
        return ``;

    return ``;
}

const hyprDispatch = async (workspace: number) => {
    await hyprland.messageAsync(`dispatch workspace ${workspace}`);
}

const updateWsButtons = (button: Button<Gtk.Widget, number>) => {
    let wsID : number = Number(button.name?.split('-')[1]);
    button.class_name = "workspace-btn";
    if (wsID === hyprland.active.workspace.id)
    {
        button.class_name += " focused";
        button.visible = true;
        return ;
    } else {
        let workspaceObj : number | undefined = hyprland.getWorkspace(wsID)?.windows;
        if (workspaceObj === undefined || workspaceObj === 0) {
            button.label = ``;
            button.visible = false;
        }
        else if (workspaceObj != undefined && workspaceObj > 0){
            button.label = ``;
            button.visible = true;
        }
    }
    // print(`wsid: ${wsID} active workspace: ${hyprland.active.workspace.id} button attribute: ${button.attribute}`);
    // print(`${button.visible} - ${button.class_name}`)
}

const workspaces = () => {
    let activeWorkspace = hyprland.active.workspace.id;
    let wsArray = Array.from({length: 10}, (_, i) => i + 1)
        .map(i => {
            let workspaceObj : number | undefined = hyprland.getWorkspace(i)?.windows;
            let isWorkspaceVisible = !(workspaceObj === undefined || workspaceObj === 0);
            return Widget.Button({
                attribute: i,
                name: `workspace-${i}`,
                class_name: `${i === activeWorkspace ? "workspace-btn focused" : "workspace-btn"}`,
                label: `${getWorkspaceIcon(i)}`,
                onClicked: async () => await hyprDispatch(i),
                visible: isWorkspaceVisible,
            })
        });

    const widget = Widget.Box({
        class_name: "workspaces",
        vertical: true,
        children: wsArray,
    });

    return Widget.EventBox({
       onScrollUp: async () => { await hyprDispatch( activeWorkspace + 1)},
       onScrollDown: async () => { await hyprDispatch(activeWorkspace - 1)},
       child: widget,
    })
        .hook(hyprland.active.workspace, () => {
            wsArray.forEach(button => {
                updateWsButtons(button);
            });
            hyprland.connect("client-added", () => {
                wsArray.forEach(button => {
                    updateWsButtons(button);
                });
            });
            hyprland.connect("client-removed", () => {
                wsArray.forEach(button => {
                    updateWsButtons(button);
                });
            });
            // print(`-----------------`);
    });
}

export default workspaces