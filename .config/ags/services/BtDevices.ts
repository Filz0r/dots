import {Variable} from "astal"
import { Subscribable } from "astal/binding"
import AstalBluetooth from "gi://AstalBluetooth?version=0.1"

type Device = AstalBluetooth.Device;


class BtDevices implements Subscribable {
    #list = Variable<Device[]>([])
    #connection: number

    #getAvailableBluetoothDevices(): Device[] {
        // your sorting algorithm
        return this.#list.get().filter(d => d.connected)
    }

    #update() { this.#list.set(this.#getAvailableBluetoothDevices()) }

    constructor() {
        const bluetooth = AstalBluetooth.get_default();

        // listen for new devices and listen to their prop changes
        this.#connection = bluetooth.connect("device-added", (_, device) => {
            console.log("connected ",device.name)
            const ids = [
                device.connect("notify::connected", () => this.#update()),
                device.connect("notify::paired", () => this.#update()),
            ]
            // cleanup
            const id = bluetooth.connect("device-removed", (_, d) => {
                console.log("disconnected ",d.name)
                if (d == device) {
                    ids.map(id => device.disconnect(id))
                    bluetooth.disconnect(id)
                    this.#update()
                }
            })
            this.#update()
        })
        this.#update()
    }

    drop() {
        const bluetooth = AstalBluetooth.get_default();

        bluetooth.disconnect(this.#connection)
        this.#list.drop()
    }


    subscribe(callback: (list: Device[]) => void) {
        return () => this.#list.subscribe(callback)
    }

    get() {
        return this.#list.get()
    }
}

export default BtDevices;