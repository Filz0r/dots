import GObject from "gi://GObject";

type QuickSettingsButtonOptions = {
  connectable: GObject.Object;
  iconCb: () => string;
  toggleCb: () => void;
  cssCb?: () => string;
  isActive?: boolean;
};

export const MyToggleButton = ({
  connectable,
  iconCb,
  toggleCb,
  cssCb,
  isActive,
}: QuickSettingsButtonOptions) => {
  const active = typeof isActive === "undefined" ? false : isActive;
  return Widget.ToggleButton({
    className: "toggle-button",
    child: Widget.Icon({
      icon: iconCb(),
      size: 28,
    }).hook(connectable, (s) => {
      s.icon = iconCb();
      if (cssCb) s.class_name = cssCb();
    }),
    active,
    onToggled: ({ active }) => {
      toggleCb();
    },
  });
};

export const CycleButton = ({
  connectable,
  iconCb,
  toggleCb,
  cssCb,
}: QuickSettingsButtonOptions) =>
  Widget.Button({
    className: "cycle-button",
    child: Widget.Icon({ icon: iconCb(), size: 32 }).hook(connectable, (s) => {
      s.icon = iconCb();
      if (cssCb) s.class_name = cssCb();
    }),
    onClicked: () => {
      toggleCb();
    },
  });
