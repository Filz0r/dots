import {
  networkAddress,
  downloadSpeed,
  uploadSpeed,
} from "../../../utils/variables";

const NetworkInfoStatistics = () => {
  const ipAddress = Widget.Box({
    className: "qs-info-box",
    vertical: true,
    children: [
      Widget.Icon("globe-symbolic"),
      Widget.Label().hook(networkAddress, (self) => {
        self.label = networkAddress.value;
      }),
    ],
  });

  const downloadSpeedLabel = Widget.Box({
    className: "qs-info-box",
    vertical: true,
    children: [
      Widget.Icon("go-down-symbolic"),
      Widget.Label().hook(downloadSpeed, (self) => {
        self.label = `${downloadSpeed.value.toFixed(2)} MB/s`;
      }),
    ],
  });

  const uploadSpeedLabel = Widget.Box({
    className: "qs-info-box",
    vertical: true,
    children: [
      Widget.Icon("go-up-symbolic"),
      Widget.Label().hook(uploadSpeed, (self) => {
        self.label = `${uploadSpeed.value.toFixed(2)} MB/s`;
      }),
    ],
  });

  return Widget.Box({
    className: "network-box-qs",
    homogeneous: true,
    children: [ipAddress, downloadSpeedLabel, uploadSpeedLabel],
  });
};

export default NetworkInfoStatistics;
