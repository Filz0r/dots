import GLib from "gi://GLib";

const distro = {
  id: GLib.get_os_info("ID"),
  logo: GLib.get_os_info("LOGO") || "󰣇",
  name: GLib.get_os_info("NAME"),
};

const options = {
  icons: {
    distroIcon: distro.logo,
    distroName: distro.name,
    distroID: distro.id,
    power: {
      poweroff: "⏻",
      reboot: "🔄",
    },
    lock: "emblem-locked",
    workspaces: {
      active: "",
      inactive: "",
    },
  },
  sizes: {
    openApps: 28,
    lockButton: 24,
    systray: 16,
  },
  fallback: {
    distro: "󰣇",
  },
};

export const speakerIcon = [
  [101, "overamplified"],
  [67, "high"],
  [34, "medium"],
  [1, "low"],
  [0, "muted"],
];

export const scriptPaths = {
  wireguard: "/home/filipe/.config/scripts/wireguard.sh",
  airplane: "/home/filipe/.config/scripts/airplane.sh",
};

export default options;
