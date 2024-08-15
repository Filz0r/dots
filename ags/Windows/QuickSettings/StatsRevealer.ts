import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import Revealer from "types/widgets/revealer";
import Box from "types/widgets/box";
import Icon from "types/widgets/icon";

type StatRevealerProps = {
  className: string;
  content: () => Gtk.Widget;
  label: () => Gtk.Widget;
};

const StatsRevealer = ({ className, content, label }: StatRevealerProps) => {
  const arrowIcon = Widget.Icon({
    icon: "pan-down-symbolic",
    class_name: "revealer-icon",
    size: 24,
    hpack: "end",
    hexpand: false,
  });
  const labelObj = label();
  labelObj.hexpand = true;
  const buttonBox = Widget.Box({
    className,
    children: [labelObj, arrowIcon],
  });
  const contentObj = content();
  contentObj.hexpand = false;
  const revealer = Widget.Revealer({
    revealChild: false,
    transition: "slide_down",
    child: contentObj,
  });
  return Widget.EventBox({
    cursor: "pointer",
    class_name: "revealer-box",
    child: Widget.Box({
      vertical: true,
      children: [buttonBox, revealer],
    }),
    onPrimaryClick: (w) => {
      let reveal: Revealer<any, any> = w.child.children[1] as Revealer<
        any,
        any
      >;
      let iconBox: Box<any, any> = w.child.children[0] as Box<any, any>;
      let icon: Icon<any> = iconBox.children[1] as Icon<any>;
      reveal.reveal_child = !reveal.reveal_child;
      if (icon.icon === "pan-down-symbolic") icon.icon = "pan-up-symbolic";
      else if (icon.icon === "pan-up-symbolic") icon.icon = "pan-down-symbolic";
    },
  });
};

export default StatsRevealer;
