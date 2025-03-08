import { App, Gtk, Gdk } from "astal/gtk3"

import Bar from "./widget/Bar/Bar"
import Applauncher from "./widget/AppLauncher/AppLauncher"
import resetCss from "./utils/resetCss";
import launchBars from "./utils/launchBars";

const bars = new Map<Gdk.Monitor, Gtk.Widget>()

import GTop from "gi://GTop";



// function test() {
//     const test = GTop.glibtop_init();
//     const data = new GTop.glibtop_cpu();
//     test.get_cpu_l(data)
//     console.log(data.frequency)
//     console.log(data.xcpu_total)
//     console.log(data.user)
//     console.log(data.total)
//     console.log(data.flags)
// }

App.start({
    main() {
        resetCss()
        launchBars(bars)
        Applauncher().hide()
        // test()
    },
    requestHandler(request: string, res: (response: any) => void) {
        if (request == "reset css") {
            resetCss()
            return res("resetting css")
        }
        if (request == "reset bars") {
            console.log(bars.entries())
            launchBars(bars, true);
            return res("restarted bars");
        }
        res("unknown command")
    },
})
