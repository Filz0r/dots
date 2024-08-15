import Separator from "./Separator";
import StatsRevealer from "../StatsRevealer";
import {
  cpuUsageValue,
  cpuTemperature,
  uptime,
  cpuCoreCount,
  cpuName,
  cpuThreadCount,
  cpuFanSpeed,
  loadAverage,
} from "../../../utils/variables";

const power = await Service.import("powerprofiles");

const cpuInfoBox = () => {
  const uptimeBox = Widget.Box({
    children: [
      Widget.Icon({ icon: "clock-applet-symbolic", size: 24 }),
      Widget.Label().hook(uptime, (s) => {
        let [hours, minutes] = uptime.value.split(":");
        s.label = `Uptime: ${hours}h:${minutes}m`;
        if (!minutes) s.label = `Uptime: 0h:${hours}m`;
      }),
    ],
  });
  const cpuText = `${cpuName.value} - ${cpuCoreCount.value}c/${cpuThreadCount.value}t`;
  const cpuInfo = Widget.Box({
    children: [
      Widget.Icon({ icon: "jockey-symbolic", size: 24 }),
      Widget.Label({ label: cpuText }),
    ],
  });

  const loadAverageBox = Widget.Box({
    children: [
      Widget.Icon({ icon: power.icon_name, size: 24 }),
      Widget.Label().hook(loadAverage, (s) => {
        s.label = `Load Avg: ${loadAverage.value}`;
      }),
    ],
  });

  const fanSpeed = Widget.Box({
    children: [
      Widget.Icon({ icon: "sensors-fan-symbolic", size: 24 }),
      Widget.Label().hook(cpuFanSpeed, (s) => {
        s.label = `${cpuFanSpeed.value} RPM`;
      }),
    ],
  });

  return Widget.Box({
    className: "qs-info-box qs-info-box-extended",
    vertical: true,
    children: [
      fanSpeed,
      Separator(),
      loadAverageBox,
      Separator(),
      cpuInfo,
      Separator(),
      uptimeBox,
    ],
  });
};

const cpuInfoLabel = () =>
  Widget.Box({
    className: "qs-cpu-info-label",
    children: [
      Widget.Icon({
        icon: "jockey-symbolic",
        size: 24,
        className: "qs-revealer-icon",
      }),
      Widget.Box({
        homogeneous: true,
        spacing: 15,
        children: [
          Widget.Label({ className: "qs-revealer-label" }).hook(
            cpuUsageValue,
            (s) => {
              let tempValue: number = cpuUsageValue.value * 100;
              s.label = `Usage: ${tempValue.toFixed(1)}%`;
            },
          ),
          Widget.Label({ className: "qs-revealer-label" }).hook(
            cpuTemperature,
            (s) => {
              let tempValue: number = cpuTemperature.value;
              s.label = `Temp: ${tempValue.toFixed(1)}ºC`;
            },
          ),
        ],
      }),
    ],
  });

const CpuInfoStatistics = () => {
  return StatsRevealer({
    className: "qs-info-box qs-revealer",
    content: cpuInfoBox,
    label: cpuInfoLabel,
  });
};

export default CpuInfoStatistics;
