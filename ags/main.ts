import LeftBar from "./Windows/LeftBar/LeftBar";
import TopBar from "./Windows/TopBar/TopBar";
// import Gtk from "gi://Gtk?version=3.0";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { NotificationPopups } from "./services/NotificationPopup";
import { forMonitor } from "./utils/utils";
import QuickSettings, {
  SetupQuickSettings,
} from "./Windows/QuickSettings/QuickSettings";
import Wireguard from "./services/Wireguard";

App.addIcons(`${App.configDir}/assets/icons`);

Gtk.IconTheme.get_default().append_search_path(
  `${App.configDir}/assets/icons/`,
);
App.config({
  style: "/tmp/ags/style.css",
  iconTheme: "Tela-circle-black",
  onConfigParsed: () => {
    SetupQuickSettings();
  },
  windows: () => [
    ...forMonitor(TopBar),
    ...forMonitor(LeftBar),
    ...forMonitor(QuickSettings),
    NotificationPopups(0),
  ],
});

// await console.log("startup: ",Wireguard.wireguard_active)

Wireguard.connect("changed", (s) => {
  console.log("main shit", s);
})
