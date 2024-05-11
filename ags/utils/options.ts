import GLib from "gi://GLib";

const distro = {
    id: GLib.get_os_info("ID"),
    logo: GLib.get_os_info("LOGO") || "󰣇",
    name: GLib.get_os_info("NAME"),
}

const options = {
    icons: {
        distroIcon: distro.logo,
        distroName: distro.name,
        distroID: distro.id,
        power: {
            poweroff: '⏻',
            reboot: '🔄',
        },
        lock: 'emblem-locked',
        workspaces: {
            active: '',
            inactive: '',
        },
    },
    sizes: {
        openApps: 28,
        lockButton: 28,
    },
    fallback: {
        distro: "󰣇",
    }
}

export default options;