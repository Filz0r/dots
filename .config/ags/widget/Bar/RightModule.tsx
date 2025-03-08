import Tray from "gi://AstalTray";
import {bind} from "astal";
import Network from "gi://AstalNetwork";
import Battery from "gi://AstalBattery";
import {Gtk} from "astal/gtk3";
import QuickSound from "./components/QuickSound";
import ConnectionIcons from "./components/ConnectionIcons";




function BatteryLevel() {
    const bat = Battery.get_default()

    return <box className="Battery"
                visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <label label={bind(bat, "percentage").as(p =>
            `${Math.floor(p * 100)} %`
        )} />
    </box>
}

function SysTray() {
    const tray = Tray.get_default()

    return <box className="SysTray">
        {bind(tray, "items").as(items => items.map(item => (
            <menubutton
                tooltipMarkup={bind(item, "tooltipMarkup")}
                usePopover={false}
                actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
                menuModel={bind(item, "menuModel")}>
                <icon gicon={bind(item, "gicon")} />
            </menubutton>
        )))}
    </box>
}



export default function RightModule () {
    return <box hexpand halign={Gtk.Align.END} >
        <SysTray />
        <QuickSound />
        <ConnectionIcons />
        <BatteryLevel />
    </box>
}