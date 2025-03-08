import Bluetooth from "gi://AstalBluetooth?version=0.1";
import {bind, Variable} from "astal";
import {Gtk} from "astal/gtk3";
import BtDevices from "../../../services/BtDevices";

interface BluetoothIconProps {
    isPowered: boolean;
}

interface DeviceIconProps {
    device: Bluetooth.Device
}

const ConnectedDevicesIcon = ({device}: DeviceIconProps) => {
    const tooltip = device.get_battery_percentage() != -1 ? `${device.name} (${Math.round(device.get_battery_percentage() * 100)}%)` : device.name;
    return <icon icon={device.get_icon()} tooltipText={tooltip}
                 className={"bt-dev"}/>
}

const BluetoothCompIcon = ({isPowered}: BluetoothIconProps): JSX.Element => (
    <icon className={''}
          icon={isPowered ? 'bluetooth-symbolic' : 'bluetooth-disabled-symbolic'}/>);

const revealHandler = (self: Gtk.EventBox, reveal: Variable<boolean>, state: boolean = true) => {
    const box: Gtk.Box = self.get_child() as Gtk.Box
    const revealer: Gtk.Revealer = box.get_children()[1] as Gtk.Revealer
    reveal.set(state);
    revealer.revealChild = reveal.get()
}

function BluetoothIcon() {
    const btService = Bluetooth.get_default();
    const reveal = Variable<boolean>(false);
    const devices = new BtDevices()

    const componentBinding = Variable.derive(
        [
            bind(btService, 'isPowered'),
            bind(btService, 'isConnected'),
        ],
        (isPowered: boolean, isConnected: boolean): JSX.Element => {
        if (isConnected) {
            return (<box
                    onDestroy={() => devices.drop()}
                >
                    <BluetoothCompIcon isPowered={isPowered}/>
                    <eventbox
                        onHover={(s) => revealHandler(s, reveal)}
                        onHoverLost={(self) => revealHandler(self, reveal, false)}
                        onClick={s => revealHandler(s, reveal, !reveal.get())}>
                        <box>
                            <icon icon={"media-record-symbolic"}
                                  className="dot-icon bt-event-box"/>
                            <revealer
                                className="BluetoothRevealer"
                                setup={s => s.revealChild = reveal.get()}
                                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                            >
                                <label label={"this shows up"}/>
                                {bind(devices).as(devices => devices.map(d => {
                                    console.log(d.name)
                                    return <ConnectedDevicesIcon device={d}/>
                                }))}
                            </revealer>
                        </box>
                    </eventbox>
                </box>);
        }
        return <BluetoothCompIcon isPowered={isPowered}/>;
    },)
    return <box>{componentBinding()}</box>
}

export default BluetoothIcon;