import {BluetoothDevice} from "../../../types/service/bluetooth";
import Gtk from "@girs/gtk-3.0";

const bluetooth = await Service.import('bluetooth')

const setDevice = (device :BluetoothDevice) : Gtk.Bin => {
    // console.log(device);
    return Widget.CircularProgress({
        tooltipText: device.name,
        attribute: device.name,
        startAt: 0,
        endAt: 1,
        value: device.battery_percentage / 100,
        css: `
            min-width: 20px;
            min-height: 20px;
            font-size: 6px;
            margin: 4px;
            padding: 2px;
            background-color: #131313;
            color: aqua;
        `,
    })

}

const bluetoothTray = () => {
    // console.log(bluetooth.devices);
    return Widget.Box({
        name: "bt-tray",
        setup: w => w
            .hook(bluetooth, (w) => {
                let temp = bluetooth.devices.filter(d => d.connected === true)
                w.children = temp.map(d => setDevice(d))
            }, "device-added")
            .hook(bluetooth, (w) => {
                let temp = bluetooth.devices.filter(d => d.connected)
                w.children = temp.map(d => setDevice(d))
            }, "device-removed")
    })
}

export default bluetoothTray;