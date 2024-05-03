const hyprland = await Service.import("hyprland")

type TWorkspace = {
    id: number;
    windows: number;
    name: string;
    icon: string;
    monitor: string;
    isActive: boolean;
}


export const workspacesInit = (wsArray) : void => {
    console.log(wsArray)
};


const miniWsPrint = (workspaces) => {
    workspaces.forEach((ws) => {
        console.log(`name: ${ws.name}`);
        console.log(`visible: ${ws.visible}`);
        console.log(`label: ${ws.label}`);
        console.log(`focus: ${ws.is_focus}`);
        // console.log(ws.bind());
        console.log(`-----------------`);
    })
}

const getWorkspaceIcon = (workspace: number) : string => {
    let icons: string[] = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
    icons.map((icon, index) => {
        let workspaceObj : number | undefined = hyprland.getWorkspace(index + 1)?.windows;
        if (workspaceObj === undefined || workspaceObj === 0) {
            icons[index] = ``;
        } else if (workspaceObj != undefined && workspaceObj > 0){
            icons[index] = ``;
        }
    })
    return icons[workspace - 1];
}

const updateButtonClass = (button) => {
    let wsID : number = button.name.split('-')[1];
    console.log(`wsid: ${wsID}`)
    if (button.attribute === wsID)
        button.class_name = "focused";
    else
        button.class_name = "workspace-btn";
    let workspaceObj : number | undefined = hyprland.getWorkspace(wsID)?.windows;

    if (button.attribute === wsID) {
        if (workspaceObj === undefined || workspaceObj === 0) {
            button.label = ``;
        }
        else if (workspaceObj != undefined && workspaceObj > 0){
            button.label = ``;
        }
    }
    const isWorkspaceVisible = !(workspaceObj === undefined || workspaceObj === 0);
    button.visible = isWorkspaceVisible;
    console.log(`${button.visible} - ${isWorkspaceVisible} - ${hyprland.getWorkspace(wsID)}`)
}

const hyprDispatch = (workspace: number) => {
    hyprland.messageAsync(`dispatch workspace ${workspace}`);
}


const workspaces = () => {
    let activeWorkspace = hyprland.active.workspace.id;
    let activeId = hyprland.active.workspace.bind("id");

console.log(hyprland.workspaces)

    let wsArray = Array.from({length: 10}, (_, i) => i + 1)
        .map(i => {
            let workspaceObj : number | undefined = hyprland.getWorkspace(i)?.windows;
            let isWorkspaceVisible = !(workspaceObj === undefined || workspaceObj === 0);
            console.log(i, isWorkspaceVisible)
            return Widget.Button({
                attribute: i,
                name: `workspace-${i}`,
                class_name: `${i === activeWorkspace ? "focused" : "workspace-btn"}`,
                label: `${getWorkspaceIcon(i)}`,
                onClicked: () => hyprDispatch(i),
                visible: isWorkspaceVisible,
            })
        });
    const widget = Widget.Box({
        class_name: "workspaces",
        vertical: true,
        children: wsArray,
    });


    widget.children.forEach(button => {
        button.hook(hyprland.active.workspace, () => {
            updateButtonClass(button);
        }, "changed");
    });

    return Widget.EventBox({
       onScrollUp: () => { hyprDispatch( activeWorkspace + 1)},
       onScrollDown: () => { hyprDispatch(activeWorkspace - 1)},
       child: widget,
       onHover: () => miniWsPrint(wsArray),
    });
}

export default workspaces

                    /*

                        // const activeId = hyprland.active.workspace.bind("id")
    // const workspaces = hyprland.bind("workspaces")
    //     .as(ws => ws.map(({ id }) => Widget.Button({
    //         on_clicked: () => hyprland.messageAsync(\`dispatch workspace ${id}\`),
    //         child: Widget.Label(\`${getWorkspaceIcon(id)}\`),
    //         class_name: activeId.as(i => \`${i === id ? "focused" : ""}\`),
    //     })))
    // console.log(workspaces);
    // console.log(getWorkspaceIcon(10));
    // return Widget.Box({
    //     class_name: "workspaces",
    //     vertical: true,
    //     children: workspaces,
    // })
                    */