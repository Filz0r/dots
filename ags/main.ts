import {LeftBar} from "./LeftBar/LeftBar";

// import {workspacesInit} from "./LeftBar/modules/workspaces";
//
//
// const hyprland = await Service.import("hyprland")
// // workspacesInit(hyprland.workspaces);

App.config({
        style: "/tmp/ags/style.css",
        gtkTheme: "gruvbox-dark-gtk",
        windows: [
            LeftBar(0),
        ],
});