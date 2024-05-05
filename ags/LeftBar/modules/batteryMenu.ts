// @ts-ignore
import Gtk from "../../types/@girs/gtk-3.0";
import Revealer = Gtk.Revealer;
import Box = Gtk.Box;
import Icon = Gtk.Icon;
import LevelBar = Gtk.LevelBar;
// import {Battery} from "resource:///com/github/Aylur/ags/service/battery.js";

const battery = await Service.import("battery")

const batteryMenu = () => {

const widget :Box<Icon, Revealer<LevelBar>> = Widget.Box({
        class_name: "battery",
        hpack: "start",
        vpack: "center",
        vertical: true,
        spacing: 5,
        children: [
            Widget.Icon({
                icon: "",
                class_name: "battery-icon",
                hpack: "center",
                vpack: "center",
            }),
            Widget.Revealer({
                revealChild: false,
                transition: "slide_up",
                class_name: "battery-reveal",
                // hpack: "center",
                // vpack: "center",
                child: Widget.LevelBar({
                    class_name: "battery-bar",
                    visible: battery.bind("available"),
                    bar_mode: "continuous",
                    vertical: true,
                    // hpack: "center",
                    vpack: "center",
                    widthRequest: 16,
                    heightRequest: 100,
                    max_value: 100,
                    min_value: 0,
                    // margin: [0, 2, 0, 2],
                    // expand: true,
                    // inverted: true,
                    value: battery.bind("percent").as(p => p),
                }),
            }),
        ],
    })
    const update = () => {
        let barObj : LevelBar = widget.children[1].child;
        console.log("update: " + barObj.value);
    }
    widget.hook(battery, (self : Box) => {
        let iconObj : Icon = self.children[0];
        let barObj : LevelBar = self.children[1].child;
        // let temp : LevelBar = barObj.child;
        iconObj.icon_name = battery.icon_name;
        // let tempPercent = battery.bind("percent").as(p => p)
        // temp.value = tempPercent;
        // console.log(tempPercent.as(p => print(p)));
        console.log("yo1 " + battery.percent);
        console.log("yo2 " + battery.icon_name);
        console.log("yo3 " + iconObj.icon_name);
        // console.log("yo4 " + temp.value);
    });
    widget.hook(battery, update);

    return Widget.EventBox({
        class_name: "battery-box",
        hpack: "center",
        vpack: "center",
        // visible: battery.bicnd("available"),
        child: widget,
        onHover: (w) => {
            let batteryReveal: Revealer<LevelBar> = w.child.children[1];
            batteryReveal.reveal_child = !batteryReveal.reveal_child;

            let progressBar : LevelBar = batteryReveal.child;
            // progressBar.value += 10;
            console.log(progressBar);
            console.log(`${progressBar.value} - ${progressBar.max_value} - ${progressBar.min_value}`);
            console.log("hover: " + progressBar.value);
        }
    })
}

export default batteryMenu;