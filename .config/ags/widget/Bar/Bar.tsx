import { App } from "astal/gtk3"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import RightModule from "./RightModule"
import LeftModule from "./LeftModule";
import CenterModule from "./CenterModule";


export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    return <window
        className="Bar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}>
        <centerbox>
            <LeftModule />
            <CenterModule />
            <RightModule />
        </centerbox>
    </window>
}