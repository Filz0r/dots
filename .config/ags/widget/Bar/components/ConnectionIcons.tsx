import Network from "gi://AstalNetwork";
import {bind} from "astal";
import BluetoothIcon from "./BluetoothIcon";



function Wifi() {
    const network = Network.get_default()
    const wifi = bind(network, "wifi")

    return <box visible={wifi.as(Boolean)}>
        {wifi.as(wifi => wifi && (<icon
            tooltipText={bind(wifi, "ssid").as(String)}
            className="Wifi"
            icon={bind(wifi, "iconName")}
        />))}
    </box>

}



export default function ConnectionIcons() {
    return <box className="ConnectionIcons">
        <BluetoothIcon/>
        <Wifi/>
    </box>
}