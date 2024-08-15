import { bash, shell } from "../utils/shell";
import Service from "resource:///com/github/Aylur/ags/service.js";
import { scriptPaths } from "utils/options";

const { wireguard } = scriptPaths;

const get = (args: string) => String(Utils.exec(`${wireguard} ${args}`));
const initialStatus = await bash("cat $HOME/.ui/status_wireguard");
console.log("initial ",initialStatus);

class Wireguard extends Service {
  static {
    Service.register(
      this,
      {},
      {
        wireguard_active: ["boolean", "rw"],
      },
    );
  }
  #wireguard_active = initialStatus === "on";

  set wireguard_active(arg: boolean) {

    if (arg === this.wireguard_active) return ;
    let cmd = `${wireguard}`;
    if (!arg) cmd += " stop"
    else cmd += " start"

    bash(`${cmd}`).then(() => {
      this.#wireguard_active = arg;
      this.changed("wireguard_active");
    })
  }


  get wireguard_active() {
    return this.#wireguard_active;
  }

  constructor() {
    super();
    const wireguardStatusFilePath = "/home/filipe/.ui/status_wireguard";

    // Copilot ftw?
    this.toggle = this.toggle.bind(this)
    this.getIcon = this.getIcon.bind(this)
    this.getClass = this.getClass.bind(this)

    const f = get("status");
    this.wireguard_active = f === "on";
    this.changed("wireguard_active");

    Utils.monitorFile(wireguardStatusFilePath, async (value) => {
      const f = await Utils.readFileAsync(value);
      this.wireguard_active = f === "on";
      this.changed("wireguard_active");
    });
  }

  toggle() {
    if (typeof this.wireguard_active === "undefined") {
      print("something something dark side")
      // this.set_property("wireguard_active", false);
      this.wireguard_active = get("status") === "on";
      console.log(this.wireguard_active)
      return;
    }
    console.log("toggle method called, current wireguard_active:", this.wireguard_active);
    this.wireguard_active = !this.wireguard_active;
    console.log("toggle method completed, new wireguard_active:", this.wireguard_active);
  }

  getIcon() {
    return "wireguard-alt2-symbolic";
  }

  getClass() {
    if (this.wireguard_active) return "vpn-active";
    return "vpn-disabled";
  }
}

export default new Wireguard();
