import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { powerOptions } from "../data";

const getPowerOptionClass = (label: string) => {
  let ret = "quick-settings-item-icon ";
  return ret + label;
};

const PowerMenu = () => {
  const ret: Gtk.Widget[] = [];
  const buttons = Object.entries(powerOptions).map(([key, option]) => {
    const icon = Widget.Icon({
      className: getPowerOptionClass(option.slug),
      icon: option.icon,
      size: 24,
    });
    const label = Widget.Label({
      className: "quick-settings-item-label",
      label: option.label,
    });
    return Widget.Button({
      className: "quick-settings-item",
      cursor: "pointer",
      onClicked: (s) => {
        console.log(s);
      },
      child: Widget.Box({
        children: [icon, label],
      }),
    });
  });

  for (let i = 0; i < buttons.length; i += 2) {
    const pair = Widget.Box({
      homogeneous: true,
      children: [
        buttons[i],
        buttons[i + 1] || Widget.Box(), // Handle odd number of buttons
      ],
    });
    ret.push(pair);
  }

  return ret;
};

export default PowerMenu;
