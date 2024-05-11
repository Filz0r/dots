const hyprland = await Service.import("hyprland")

export async function dispatchWorkspace(workspace: number){
     await hyprland.messageAsync(`dispatch workspace ${workspace}`);
}

export async function changeToWindow(address: string) {
    await hyprland.messageAsync(`dispatch focuswindow address:${address}`);
}