import { Button } from "resource:///com/github/Aylur/ags/widgets/button.js";
import { Label } from "resource:///com/github/Aylur/ags/widgets/label.js";

import options from "../../utils/options";

const lockButton = () => {
    let cmd = "swaylock -f --color 504945 -F --ring-ver-color 458588 --indicator-idle-visible --inside-color 83A598 --line-color FABD2F --ring-color FABD2F";
    return Widget.Button({
        vpack: "end",
        cursor: "pointer",
        class_name: "lock-button",
        child: Widget.Icon({
            icon: options.icons.lock,
            size: options.sizes.lockButton,
        }),
        onClicked: () => {
            Utils.exec(`${cmd}`);
        },
        onHover: (self) => {
            // @ts-ignore
            self.child.className += " lock-hover";
        },
        onHoverLost:  (self) => {
            // @ts-ignore
            self.child.className = self.child.className.replace(" lock-hover", "");
        }
    })
}

export default lockButton;