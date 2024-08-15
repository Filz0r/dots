import Gtk from "types/@girs/gtk-3.0";
import Revealer = Gtk.Revealer;
import Box = Gtk.Box;
import Icon = Gtk.Icon;
import ProgressBar = Gtk.ProgressBar;
import EventBox = Gtk.EventBox;
import {
  getBatteryClass,
  getBatteryIcon,
  getIconClass,
  secondsToHM,
} from "../../../utils/utils";

const battery = await Service.import("battery");

const batteryMenu = () => {
  const widget: Box<Icon, Revealer<ProgressBar>> = Widget.Box({
    vertical: false,
    spacing: 0,
    children: [
      Widget.Revealer({
        revealChild: false,
        transition: "slide_left",
        child: Widget.ProgressBar({
          show_text: false,
          vertical: false,
          inverted: false,
          widthRequest: 100,
          // heightRequest: 46,
        }).hook(battery, (self: ProgressBar) => {
          self.value = battery.percent > 0 ? battery.percent / 100 : 0;
          self.class_name = getBatteryClass(battery);
        }),
      }),
      Widget.Icon({
        icon: getBatteryIcon(battery, "top-bar"),
        hpack: "center",
        vpack: "center",
      }).hook(battery, (self: Icon) => {
        self.icon = battery.icon_name;
        self.class_name = getIconClass(battery);
      }),
    ],
  });

  return Widget.EventBox({
    class_name: "battery-box",
    visible: battery.bind("available"),
    child: widget,
    cursor: "pointer",
    onPrimaryClick: (w: EventBox<Box<Icon, Revealer<ProgressBar>>>) => {
      let batteryReveal: Revealer<ProgressBar> = w.child.children[0];
      batteryReveal.reveal_child = !batteryReveal.reveal_child;
    },
  }).hook(battery, (self: EventBox<Box<Icon, Revealer<ProgressBar>>>) => {
    self.tooltip_text = `${battery.percent}% ${secondsToHM(battery.time_remaining)}`;
  });
};

export default batteryMenu;
