import systemTray from "./modules/systemTray";
import clock from "./modules/clock";
import batteryMenu from "./modules/batteryMenu";
import lockButton from "./modules/lockButton";
import bluetoothTray from "./modules/bluetoothTray";
import QuickSettingsButton from "./modules/QuickSettingsButton";
import WeatherTooltip from "./modules/WeatherTooltip";

const topBarLeft = () => {
  return Widget.Box({
    className: "top-bar-left",
    hpack: "start",
    vpack: "start",
    children: [
      // media(),
      // openApplications(),
    ],
  });
};

const topBarCenter = () => {
  return Widget.Box({
    className: "top-bar-center",
    hpack: "center",
    vpack: "center",
    children: [
      clock(),
        WeatherTooltip(),
      // weather(),
      // notificationCenter(),
    ],
  });
};

const topBarRight = () => {
  return Widget.Box({
    className: "top-bar-right",
    vpack: "end",
    hpack: "end",
    children: [
      // connectionMenu(),
      systemTray(),
      batteryMenu(),
      // lockButton(),
      bluetoothTray(),
      QuickSettingsButton(),
    ],
  });
};

const TopBar = (monitor = 0) => {
  return Widget.Window({
    name: `top-bar-${monitor}`, // name has to be unique
    class_name: "top-bar",
    monitor,
    anchor: ["left", "top", "right"],
    exclusivity: "exclusive",
    child: Widget.Box({
      vertical: false,
      homogeneous: true,
      spacing: 250,
      children: [topBarLeft(), topBarCenter(), topBarRight()],
    }),
  });
};

export default TopBar;
