import {App, Gdk, Gtk} from "astal/gtk3"
import Bar from "../widget/Bar/Bar";

export default function launchBars(bars : Map<Gdk.Monitor, Gtk.Widget>, clear: boolean = false) {
    // initialize
    if (clear) {
        for (const bar of bars) {
            bar[1].destroy()
        }
        bars.clear()
    }
    for (const gdkmonitor of App.get_monitors()) {
        bars.set(gdkmonitor, Bar(gdkmonitor))
    }

    App.connect("monitor-added", (_, gdkmonitor) => {
        bars.set(gdkmonitor, Bar(gdkmonitor))
    })

    App.connect("monitor-removed", (_, gdkmonitor) => {
        bars.get(gdkmonitor)?.destroy()
        bars.delete(gdkmonitor)
    })
}