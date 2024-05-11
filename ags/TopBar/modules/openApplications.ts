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

// const usedIcon = options.icons.workspaces.active;
// const emptyIcon = options.icons.workspaces.inactive;
//
// const getWorkspaceIcon = (workspace: number): string => {
//
//     // let workspaceObj: number | undefined = hyprland.getWorkspace(workspace + 1)?.windows;
//     //
//     // if ((workspaceObj === undefined || workspaceObj === 0) && workspace !== hyprland.active.workspace.id)
//     //     return emptyIcon;
//     // else if ((workspaceObj != undefined && workspaceObj > 0) || workspace === hyprland.active.workspace.id)
//         return usedIcon;
//     // else
//     //     return "fuck";
// }
//
//
// const updateWsButtons = (button: Button<Gtk.Widget, number>) => {
//     let wsID : number = Number(button.name?.split('-')[1]);
//     button.class_name = "workspace-btn";
//     if (wsID === hyprland.active.workspace.id)
//     {
//         button.class_name += " focused";
//         button.visible = true;
//         return ;
//     } else {
//         let workspaceObj : number | undefined = hyprland.getWorkspace(wsID)?.windows;
//         if (workspaceObj === undefined || workspaceObj === 0) {
//             // button.label = emptyIcon;
//             button.visible = false;
//         }
//         else if (workspaceObj != undefined && workspaceObj > 0){
//             // button.label = usedIcon;
//             button.visible = true;
//         }
//     }
//     // print(`wsid: ${wsID} active workspace: ${hyprland.active.workspace.id} button attribute: ${button.attribute}`);
//     // print(`${button.visible} - ${button.class_name}`)
// }
//
// const workspaces = () => {
//     let activeWorkspace = hyprland.active.workspace.id;
//     let wsArray = Array.from({length: 10}, (_, i) => i + 1)
//         .map(i => {
//             let workspaceObj : number | undefined = hyprland.getWorkspace(i)?.windows;
//             let isWorkspaceVisible = !(workspaceObj === undefined || workspaceObj === 0);
//             return Widget.Button({
//                 attribute: i,
//                 name: `workspace-${i}`,
//                 class_name: `${i === activeWorkspace ? "workspace-btn focused" : "workspace-btn"}`,
//                 label: `${getWorkspaceIcon(i)}`,
//                 onClicked: async () => await hyprDispatch(i),
//                 visible: isWorkspaceVisible,
//             })
//         });
//
//     const widget = Widget.Box({
//         class_name: "workspaces",
//         vertical: true,
//         children: wsArray,
//     });
//
//     return Widget.EventBox({
//        onScrollUp: async () => { await hyprDispatch( activeWorkspace + 1)},
//        onScrollDown: async () => { await hyprDispatch(activeWorkspace - 1)},
//        child: widget,
//     })
//         .hook(hyprland.active.workspace, () => {
//             wsArray.forEach(button => {
//                 updateWsButtons(button);
//             });
//             hyprland.connect("client-added", () => {
//                 wsArray.forEach(button => {
//                     updateWsButtons(button);
//                 });
//             });
//             hyprland.connect("client-removed", () => {
//                 wsArray.forEach(button => {
//                     updateWsButtons(button);
//                 });
//             });
//             // print(`-----------------`);
//     });
// }


export default openApplications;