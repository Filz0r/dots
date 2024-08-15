import {
  ramAvailable,
  ramCached,
  ramFree,
  ramShared,
  ramTotal,
  ramUsageValue,
  ramUsed,
  swapFree,
  swapTotal,
  swapUsed,
} from "utils/variables";
import StatsRevealer from "../StatsRevealer";
import { getRamClass } from "utils/utils";
import Separator from "./Separator";

const ramInfoBox = () => {
  const ramBox = Widget.Box({
    homogeneous: true,
    vertical: true,
    children: [
      Widget.Label("RAM"),
      Widget.Label().hook(ramTotal, (s) => {
        s.label = `Total: ${ramTotal.value.toFixed(1)}GiB`;
      }),
      Widget.Label().hook(ramUsed, (s) => {
        s.label = `Used: ${ramUsed.value.toFixed(1)}GiB`;
      }),
      Widget.Label().hook(ramAvailable, (s) => {
        s.label = `Available: ${ramAvailable.value.toFixed(1)}GiB`;
      }),
      // Uncomment the block bellow to show ALL the ram info
      // Widget.Label().hook(ramFree, (s) => {
      // s.label = `Free: ${ramFree.value.toFixed(1)}GiB`;
      // }),
      // Widget.Label().hook(ramCached, (s) => {
      // s.label = `Cached: ${ramCached.value.toFixed(1)}GiB`;
      // }),
      // Widget.Label().hook(ramShared, (s) => {
      //   s.label = `Shared: ${ramShared.value.toFixed(1)}GiB`;
      // }),
    ],
  });

  const swapBox = Widget.Box({
    vertical: true,
    homogeneous: true,
    children: [
      Widget.Label("Swap"),
      Widget.Label().hook(swapTotal, (s) => {
        s.label = `Total: ${swapTotal.value.toFixed(1)}GiB`;
      }),
      Widget.Label().hook(swapUsed, (s) => {
        s.label = `Used: ${swapUsed.value.toFixed(1)}GiB`;
      }),
      Widget.Label().hook(swapFree, (s) => {
        s.label = `free: ${swapFree.value.toFixed(1)}GiB`;
      }),
    ],
  });

  return Widget.Box({
    className: "qs-info-box qs-info-box-extended",
    homogeneous: true,
    spacing: 15,
    children: [ramBox, swapBox],
  });
};

const ramInfoLabel = () => {
  const progressBar = Widget.ProgressBar({}).hook(ramUsageValue, (s) => {
    s.value = ramUsageValue.value;
    s.class_name = getRamClass(ramUsageValue);
  });
  const icon = Widget.Icon({ icon: "nvidia-ram-symbolic", size: 24 });
  return Widget.Box({
    homogeneous: true,
    spacing: 15,
    children: [icon, progressBar],
  });
};

const RamInfoStatistics = () => {
  return StatsRevealer({
    className: "qs-info-box qs-revealer",
    content: ramInfoBox,
    label: ramInfoLabel,
  });
};

export default RamInfoStatistics;
