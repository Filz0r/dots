// @ts-ignore
import Gtk from "../../types/@girs/gtk-3.0";
import Revealer = Gtk.Revealer;
import Box = Gtk.Box;
import Icon = Gtk.Icon;
import ProgressBar = Gtk.ProgressBar;
import EventBox = Gtk.EventBox;

const battery = await Service.import("battery")

const getBatteryClass = (battery) : string => {
    if (!battery.charging)
    {
        if (battery.percent > 75)
            return "battery-bar battery-high";
        else if (battery.percent > 45)
            return "battery-bar battery-medium";
        else
            return "battery-bar battery-low";
    }
    return "battery-bar charging";
}

const getIconClass = (battery) : string => {
    if (!battery.charging)
    {
        if (battery.percent > 75)
            return "battery-icon battery-high";
        else if (battery.percent > 45)
            return "battery-icon battery-medium";
        else
            return "battery-icon battery-low";
    }
    return "battery-icon charging";
}

const batteryMenu = () => {

const widget :Box<Icon, Revealer<ProgressBar>> = Widget.Box({
        vertical: true,
        spacing: 0,
        children: [
            Widget.Icon({
                icon: "",
                hpack: "center",
                vpack: "center",
            }).hook(battery, (self: Icon) =>{
                self.icon = battery.icon_name;
                self.class_name = getIconClass(battery);
            }),
            Widget.Revealer({
                revealChild: false,
                transition: "slide_up",
                class_name: "battery-reveal",
                child: Widget.ProgressBar({
                        show_text: false,
                        vertical: true,
                        inverted: true,
                        widthRequest: 16,
                        heightRequest: 100,
                }).hook(battery, (self : ProgressBar) => {
                    self.value = battery.percent > 0 ? battery.percent / 100 : 0;
                    self.class_name = getBatteryClass(battery);
                }),
            }),
        ],
    })
    // widget.hook(battery, (self : Box<Icon, Revealer<ProgressBar>>) => {
    //     let icon : Icon = self.children[0];
    //     let progressBar : ProgressBar = self.children[1].child;
    //     icon.icon = battery.icon_name;
    //     icon.class_name = getIconClass(battery);
    //     progressBar.value = battery.percent > 0 ? battery.percent / 100 : 0;
    //     progressBar.class_name = getBatteryClass(battery);
    // });
    return Widget.EventBox({
        class_name: "battery-box",
        // tooltip_text: `${battery.percent}% ${battery.time_remaining}`,
        visible: battery.bind("available"),
        child: widget,
        onHover: (w : EventBox<Box<Icon, Revealer<ProgressBar>>>) => {
            let batteryReveal: Revealer<ProgressBar> = w.child.children[1];
            if (!batteryReveal.reveal_child)
                batteryReveal.reveal_child = true;
            // let progressBar : ProgressBar = batteryReveal.child;
            // let icon : Icon = w.child.children[0];
            // console.log("hover: " + progressBar.value);
            // console.log("hover: " + progressBar.class_name);
            // console.log("hover: " + icon.class_name);
        },
        onHoverLost: (w : EventBox<Box<Icon, Revealer<ProgressBar>>>) => {
            let batteryReveal: Revealer<ProgressBar> = w.child.children[1];
            if (batteryReveal.reveal_child)
                batteryReveal.reveal_child = false;
        }
    }).hook(battery, (self : EventBox<Box<Icon, Revealer<ProgressBar>>>) => {
        self.tooltip_text = `${battery.percent}% ${battery.time_remaining}`;
    });
}

export default batteryMenu;