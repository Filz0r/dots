import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import Gdk from "gi://Gdk";
import { Battery } from "resource:///com/github/Aylur/ags/service/battery.js";
import { Variable } from "resource:///com/github/Aylur/ags/variable.js";
import Brightness from "services/Brightness";

export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

export const forMonitor = (bar: (monitor: number) => Gtk.Window) => {
  const number = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(number, 0).flatMap(bar);
};

export function maxToPercent(max: number, value: number) {
  return value / max;
}

export const divide = ([total, free]) => free / total;

export const getBatteryClass = (
  battery: Battery,
  base: "battery-bar" | "battery-bar-qs" = "battery-bar",
): string => {
  if (battery.charging) return `${base} charging`;
  if (battery.percent > 67) return `${base} battery-high`;
  else if (battery.percent > 35) return `${base} battery-medium`;
  else return `${base} battery-low`;
};

export const getIconClass = (
  battery: Battery,
  base: "battery-icon" | "battery-icon-qs" = "battery-icon",
): string => {
  if (battery.charging) return `${base} charging`;
  if (battery.percent > 67) return `${base} battery-high`;
  else if (battery.percent > 35) return `${base} battery-medium`;
  else return `${base} battery-low`;
};

function qsBattery(battery: Battery) {
  if (battery.charging && !battery.charged) return "battery-charging-symbolic";
  if (battery.percent >= 80) return "battery-4-symbolic";
  else if (battery.percent >= 65) return "battery-3-symbolic";
  else if (battery.percent >= 45) return "battery-2-symbolic";
  else if (battery.percent >= 20) return "battery-1-symbolic";
  else if (battery.percent >= 10) return "battery-0-symbolic";
  else return "battery-exclamation-symbolic";
}

export const getBatteryIcon = (
  battery: Battery,
  type: "top-bar" | "quick-settings",
) => {
  switch (type) {
    case "quick-settings":
      return qsBattery(battery);
    case "top-bar":
      return battery.icon_name;
  }
};

export const getStorageClass = (storage: Variable<number>) => {
  if (storage.value > 75) return "battery-bar-qs battery-low";
  else if (storage.value > 45) return "battery-bar-qs battery-medium";
  else return "battery-bar-qs battery-high";
};

export const getCpuClass = (cpu: Variable<number>) => {
  if (cpu.value * 100 > 75) return "battery-bar-qs battery-low";
  else if (cpu.value * 100 > 45) return "battery-bar-qs battery-medium";
  else return "battery-bar-qs battery-high";
};

export const getRamClass = (ram: Variable<number>) => {
  if (ram.value * 100 > 75) return "battery-bar-qs battery-low";
  else if (ram.value * 100 > 45) return "battery-bar-qs battery-medium";
  else return "battery-bar-qs battery-high";
};

export function secondsToHM(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export const getCorrectBrightnessIcon = (): string => {
  if (Brightness.screen == 1) return "display-brightness-high-symbolic";
  else if (Brightness.screen >= 0.7)
    return "display-brightness-medium-symbolic";
  else return "display-brightness-low-symbolic";
};
