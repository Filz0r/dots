import Hyprland from "gi://AstalHyprland";
import {bind, GLib} from "astal";
import {App, Gtk} from "astal/gtk3";

function Launcher() {
    const clickHandler = () => {
        const status = App.get_window("launcher")?.visible;
        if (!status)
            App.get_window("launcher")!.show()
        else
            App.get_window("launcher")!.hide()
    }
    return <button onClicked={clickHandler}
    className="AppLauncherBtn">
        <icon icon={GLib.get_os_info("LOGO") || "missing-symbolic"}></icon>
    </button>
}

function Workspaces() {
    const hypr = Hyprland.get_default()

    return <box className="Workspaces">
        {bind(hypr, "workspaces").as(wss => wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <button
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? "focused" : "")}
                    onClicked={() => ws.focus()}>
                    {ws.id}
                </button>
            ))
        )}
    </box>
}

export default function LeftModule() {
    return <box hexpand halign={Gtk.Align.START}>
        <Launcher />
        <Workspaces />
    </box>
}