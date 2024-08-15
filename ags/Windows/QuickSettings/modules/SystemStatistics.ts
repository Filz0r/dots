import CpuInfoStatistics from "./CpuInfoStatistics";
import RamInfoStatistics from "./RamInfoStatistics";
import DiskInfoStatistics from "./DiskInfoStatistics";
import NetworkInfoStatistics from "./NetworkInfoStatistics";
import StatsRevealer from "../StatsRevealer";
import Revealer from "types/widgets/revealer";
import Box from "types/widgets/box";
import Icon from "types/widgets/icon";
import {
  cpuTemperature,
  cpuUsageValue,
  ramTotal,
  ramUsed,
} from "utils/variables";

//TODO: This needs a LOOOTTT of CSS styling to look good, gl gl futur me

const isOpen = Variable(false);

const systemStatBox = () => {
  return Widget.Box({
    vertical: true,
    spacing: 20,
    children: [
      CpuInfoStatistics(),
      RamInfoStatistics(),
      DiskInfoStatistics(),
      NetworkInfoStatistics(),
    ],
  });
};

const sysStatsLabel = () => {
  return Widget.Box({
    child: Widget.Box({
      // homogeneous: true,
      spacing: 5,
      children: [
        Widget.Icon("jockey-symbolic"),
        Widget.Label().hook(cpuUsageValue, (s) => {
          s.label = `${(cpuUsageValue.value * 100).toFixed(1)}%`;
        }),
        Widget.Icon("temperature-symbolic"),
        Widget.Label().hook(cpuTemperature, (s) => {
          s.label = `${cpuTemperature.value.toFixed(1)} ºC`;
        }),
        Widget.Icon("nvidia-ram-symbolic"),
        Widget.Label().hook(ramUsed, (s) => {
          s.label = `${ramUsed.value.toFixed(1)}/${ramTotal.value}GB`;
        }),
      ],
    }),
  }).hook(isOpen, (s) => (s.child.visible = !isOpen.value));
};

const SystemStatistics = () => {
  const temp = StatsRevealer({
    className: "qs-info-box qs-revealer",
    content: systemStatBox,
    label: sysStatsLabel,
  });
  temp.hook(isOpen, (s) => {
    s.on_primary_click = (w) => {
      if (!isOpen.value) {
        let reveal: Revealer<any, any> = w.child.children[1] as Revealer<
          any,
          any
        >;
        let iconBox: Box<any, any> = w.child.children[0] as Box<any, any>;
        let icon: Icon<any> = iconBox.children[1] as Icon<any>;
        reveal.reveal_child = !reveal.reveal_child;
        if (icon.icon === "pan-down-symbolic") icon.icon = "pan-up-symbolic";
        else if (icon.icon === "pan-up-symbolic")
          icon.icon = "pan-down-symbolic";
        isOpen.value = !isOpen.value;
      }
    };
    s.on_secondary_click = (w) => {
      if (isOpen.value) {
        let reveal: Revealer<any, any> = w.child.children[1] as Revealer<
          any,
          any
        >;
        let iconBox: Box<any, any> = w.child.children[0] as Box<any, any>;
        let icon: Icon<any> = iconBox.children[1] as Icon<any>;
        reveal.reveal_child = !reveal.reveal_child;
        if (icon.icon === "pan-down-symbolic") icon.icon = "pan-up-symbolic";
        else if (icon.icon === "pan-up-symbolic")
          icon.icon = "pan-down-symbolic";
        isOpen.value = !isOpen.value;
      }
    };
  });
  return temp;
};

export default SystemStatistics;
