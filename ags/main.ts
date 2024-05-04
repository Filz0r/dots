import {LeftBar} from "./LeftBar/LeftBar";

App.config({
        style: "/tmp/ags/style.css",
        gtkTheme: "gruvbox-dark-gtk",
        windows: [
            LeftBar(0),
            // LeftBar(1),
        ],

});