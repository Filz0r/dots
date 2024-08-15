import { bash, shell } from "utils/shell";
import { scriptPaths } from "utils/options";

const { airplane } = scriptPaths;

const get = (args: string) => String(Utils.exec(`${airplane} ${args}`));

class Airplane extends Service {
  static {
    Service.register(
      this,
      {},
      {
        active: ["boolean", "rw"],
        ethernetStatus: ["boolean", "r"],
        wifiStatus: ["boolean", "r"],
        bluetoothStatus: ["boolean", "r"],
        wireguardStatus: ["boolean", "r"],
      },
    );
  }

  #active = get("status") === "on" ? true : false;
  #ethernetStatus = get("wired") === "on" ? true : false;
  #wifiStatus = get("wifi") === "on" ? true : false;
  #bluetoothStatus = get("bluetooth") === "on" ? true : false;
  #wireguardStatus = get("wireguard") === "on" ? true : false;

  getIcon() {
    if (this.active) return "airplane-mode-symbolic";
    return "airplane-mode-disabled-symbolic";
  }

  toggleMode() {
    get("toggle");
    this.active = !this.active;
    this.changed("active");
  }
  toggleWifi() {}
  toggleEthernet() {}
  toggleBluetooth() {}
  toggleWireguard() {}

  set active(arg: boolean) {
    this.#active = arg;
  }

  set ethernetStatus(arg: boolean) {
    this.#ethernetStatus = arg;
  }

  set wifiStatus(arg: boolean) {
    this.#wifiStatus = arg;
  }

  set bluetoothStatus(arg: boolean) {
    this.#bluetoothStatus = arg;
  }

  set wireguardStatus(arg: boolean) {
    this.#wireguardStatus = arg;
  }

  get active() {
    return this.#active;
  }

  get ethernetStatus() {
    return this.#ethernetStatus;
  }

  get wifiStatus() {
    return this.#wifiStatus;
  }

  get bluetoothStatus() {
    return this.#bluetoothStatus;
  }

  get wireguardStatus() {
    return this.#wireguardStatus;
  }

  constructor() {
    super();
  }
}

export default new Airplane();
