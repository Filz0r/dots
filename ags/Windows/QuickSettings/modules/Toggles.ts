import { MyToggleButton, CycleButton } from "../QuickSettingsButtons";
import Brightness from "services/Brightness";
import Wireguard from "services/Wireguard";

const network = await Service.import("network");
const bluetooth = await Service.import("bluetooth");
const powerProfiles = await Service.import("powerprofiles");

const powerProfileToggle = () => {
  switch (powerProfiles.active_profile) {
    case "balanced":
      powerProfiles.active_profile = "performance";
      break;
    case "performance":
      powerProfiles.active_profile = "power-saver";
      break;
    case "power-saver":
      powerProfiles.active_profile = "balanced";
  }
};

const powerProfileIconCb = () => {
  return powerProfiles.icon_name;
};

const powerProfileCssCb = () => {
  switch (powerProfiles.active_profile) {
    case "balanced":
      return "power-balanced";
    case "performance":
      return "power-performance";
    case "power-saver":
      return "power-saver";
    default:
      return "power-default";
  }
};

const wifiToggle = () => {
  network.toggleWifi();
};

const wifiIconCb = () => {
  return network.wifi.icon_name;
};

const bluetoothToggle = () => {
  bluetooth.toggle();
};

const bluetoothIconCb = () => {
  if (bluetooth.enabled) return "bluetooth-active-symbolic";
  else return "bluetooth-disabled-symbolic";
};

const firstRow = () => {
  return Widget.Box({
    spacing: 10,
    // homogeneous: true,
    children: [
      MyToggleButton({
        connectable: Wireguard,
        iconCb: Wireguard.getIcon,
        toggleCb: Wireguard.toggle,
        cssCb: Wireguard.getClass,
        isActive: Wireguard.wireguard_active,
      }),
      CycleButton({
        connectable: Brightness,
        iconCb: Brightness.getScreenIcon,
        toggleCb: Brightness.cycleScreen,
      }),
      CycleButton({
        connectable: Brightness,
        iconCb: Brightness.getKbdIcon,
        toggleCb: Brightness.cycleKbd,
        cssCb: Brightness.getKbdClass,
      }),
      CycleButton({
        connectable: powerProfiles,
        iconCb: powerProfileIconCb,
        toggleCb: powerProfileToggle,
        cssCb: powerProfileCssCb,
      }),
      CycleButton({
        connectable: network.wifi,
        iconCb: wifiIconCb,
        toggleCb: wifiToggle,
      }),
      MyToggleButton({
        connectable: bluetooth,
        iconCb: bluetoothIconCb,
        toggleCb: bluetoothToggle,
        isActive: bluetooth.enabled,
      }),
    ],
  });
};

const Toggles = () => {
  return Widget.Box({
    vertical: true,
    homogeneous: true,
    children: [firstRow()],
  });
};

export default Toggles;
