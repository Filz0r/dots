import options from "../../utils/options";
import { showQuickSettings } from "../../utils/variables";
import PowerMenu from "./modules/PowerMenu";
import Separator from "./modules/Separator";
import SystemStatistics from "./modules/SystemStatistics";
import QuickSettingsToggles from "./modules/QuickSettingsToggles";
import Toggles from "./modules/Toggles";

const audio = await Service.import("audio");
const hyprland = await Service.import("hyprland");

/** @param { 'speaker' | 'microphone' } type */
const volumeSlider = (type: "speaker" | "microphone" = "speaker") => {
  const slider = Widget.Slider({
    className: `quick-settings-${type}-slider`,
    hexpand: true,
    drawValue: false,
    onChange: ({ value, dragging }) => {
      if (dragging) {
        audio[type].volume = value;
        audio[type].is_muted = false;
      }
    },
    value: audio[type].bind("volume"),
  });
  const icon = Widget.Icon().hook(audio[type], (self) => {
    const vol = audio[type].volume * 100;
    if (type === "speaker") {
      //TODO: duplicated
      const icon = [
        [101, "overamplified"],
        [67, "high"],
        [34, "medium"],
        [1, "low"],
        [0, "muted"],
        // @ts-ignore
      ].find(([threshold]) => threshold <= vol)?.[1];
      self.icon = `audio-volume-${icon}-symbolic`;
      self.tooltip_text = `Volume ${Math.floor(vol)}%`;
      self.size = options.sizes.systray;
    } else if (type === "microphone") {
      const icon = [
        [67, "high"],
        [1, "low"],
        [0, "muted"],
        // @ts-ignore
      ].find(([threshold]) => threshold <= vol)?.[1];
      self.icon = `microphone-sensitivity-${icon}-symbolic`;
      self.tooltip_text = `Volume ${Math.floor(vol)}%`;
      self.size = options.sizes.systray;
    }
  });
  return Widget.Box({
    name: `quick-settings-${type}-slider`,
    children: [icon, slider],
  });
};

const QuickSettings = (monitor: number = 0) => {
  return Widget.Window({
    name: `quick-settings-${monitor}`,
    className: "quick-settings",
    monitor,
    anchor: ["top", "right"],
    margins: [0.5, 1.5, 0, 0],
    visible: showQuickSettings.value,
    child: Widget.Box({
      className: "quick-settings-box",
      vertical: true,
      children: [
        Toggles(),
        Separator(),
        SystemStatistics(),
        Separator(),
        volumeSlider(),
        volumeSlider("microphone"),
        Separator(),
        ...PowerMenu(),
      ],
    }),
  });
};

export function SetupQuickSettings() {
  showQuickSettings.connect("changed", (self) => {
    const activeMonitor: number = hyprland.active.monitor.id;
    App.windows.forEach((w) => {
      if (w.name === `quick-settings-${activeMonitor}`) {
        w.visible = self.value;
      }
    });
  });
}

export default QuickSettings;
