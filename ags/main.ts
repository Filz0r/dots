import LeftBar from "./LeftBar/LeftBar";
import TopBar from "./TopBar/TopBar";
import {NotificationPopups}  from "./services/NotificationPopup";
import {forMonitor} from "./utils/utils";


App.config({
        style: "/tmp/ags/style.css",
        gtkTheme: "gruvbox-dark-gtk",
        windows: () => [
            ...forMonitor(TopBar),
            ...forMonitor(LeftBar),
            // LeftBar(0),
            NotificationPopups(0),
        ]
});