import {bash, shell} from "../utils/shell";

const get = (args: string) => Number(Utils.exec(`brightnessctl ${args}`));
const screen = await bash("ls -w1 /sys/class/backlight | head -1");
const kbd = await bash("ls -w1 /sys/class/leds | grep kbd | head -1");

class Brightness extends Service {
    static {
        Service.register(
            this,
            {
            },
            {

                'screen': ['float', 'rw'],
                'kbd': ['int', 'rw'],
                'screenMax': ["float", "r"],
                'kbdMax': ["int", "r"],
            });
    }

    #screen = (get("get")) / get("max") || 1;
    #screenMax = get(`--device ${screen} max`) || 1;
    #kbd = get(`--device ${kbd} get`);
    #kbdMax = get(`--device ${kbd} max`);

    get screenMax() { return this.#screenMax; }
    get kbdMax() { return this.#kbdMax; }
    get screen() { return this.#screen; }
    get kbd() { return  this.#kbd; }

    set kbd(value :number) {
        if (value < 0 || value > this.#kbdMax)
            return ;
        shell(`brightnessctl --device ${kbd} set ${value}`).then(() => {
            this.#kbd = value;
            this.changed("kbd");
        });
    }

    set screen(percent :number) {
        if (percent < 0)
            percent = 0;
        else if (percent > 1)
            percent = 1;
        shell(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
            this.#screen = percent;
            this.changed("screen");
        })
    }

    constructor() {
        super();

        const screenPath = `/sys/class/backlight/${screen}/brightness`;
        const kbdPath = `/sys/class/leds/${kbd}/brightness`;

        Utils.monitorFile(screenPath, async (value) => {
          const f = await Utils.readFile(value);
          this.#screen = Number(f) / this.#screenMax;
          this.changed("screen");
        })

        Utils.monitorFile(kbdPath, async (value) => {
            const f = await Utils.readFile(value);
            this.#kbd = Number(f) / this.#kbdMax;
            this.changed("kbd");
        })

    }
}


export default new Brightness;

