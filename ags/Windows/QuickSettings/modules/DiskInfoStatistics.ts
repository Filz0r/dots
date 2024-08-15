import {
  storageFreeBoot,
  storageFreeHome,
  storageFreeRoot,
  storagePercentRoot,
  storageTotalBoot,
  storageTotalHome,
  storageTotalRoot,
  storageUsedBoot,
  storageUsedHome,
  storageUsedRoot,
  storageValue,
} from "utils/variables";
import StatsRevealer from "../StatsRevealer";
import { getStorageClass, range } from "utils/utils";
import { Variable } from "types/variable";

type partitionInfoBoxProps = {
  label: "/" | "/home" | "/boot";
  variables: string[];
  css_class: string;
};

const partitionInfoBox = ({
  label,
  variables,
  css_class,
}: partitionInfoBoxProps) => {
  const labels = variables.map((variable) => {
    return Widget.Label({ label: variable });
  });
  return Widget.Box({
    className: css_class,
    vertical: true,
    homogeneous: true,
    children: [Widget.Label(label), ...labels],
  });
};

const diskInfoBox = () => {
  const data: partitionInfoBoxProps[] = [
    {
      label: "/home",
      variables: [
        `Free: ${storageFreeHome.getValue()}GB`,
        `Used: ${storageUsedHome.getValue()}GB`,
        `Total: ${storageTotalHome.getValue()}GB`,
      ],
      css_class: "qs-partition-box",
    },
    {
      label: "/",
      variables: [
        `Free: ${storageFreeRoot.getValue()}GB`,
        `Used: ${storageUsedRoot.getValue()}GB`,
        `Total: ${storageTotalRoot.getValue()}GB`,
      ],
      css_class: "qs-partition-box",
    },
    {
      label: "/boot",
      variables: [
        `Free: ${storageFreeBoot.getValue()}MB`,
        `Used: ${storageUsedBoot.getValue()}MB`,
        `Total: ${storageTotalBoot.getValue()}MB`,
      ],
      css_class: "qs-partition-box",
    },
  ];
  const childArr = range(3, 0).map((i) => {
    const widget = partitionInfoBox(data[i]);
    return widget;
  });
  return Widget.Box({
    homogeneous: true,
    setup: (w) => (w.children = childArr),
  });
};

const diskInfoLabel = () => {
  const progressBar = Widget.ProgressBar({}).hook(storageValue, (s) => {
    s.value = storageValue.value;
    s.class_name = getStorageClass(storageValue);
  });
  const icon = Widget.Icon({ icon: "drive-harddisk-symbolic", size: 24 });
  return Widget.Box({
    homogeneous: true,
    spacing: 15,
    children: [icon, progressBar],
  });
};

const DiskInfoStatistics = () => {
  return StatsRevealer({
    className: "qs-info-box qs-revealer",
    content: diskInfoBox,
    label: diskInfoLabel,
  });
};

export default DiskInfoStatistics;
