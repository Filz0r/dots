import { Button } from "resource:///com/github/Aylur/ags/widgets/button.js";
import { Label } from "resource:///com/github/Aylur/ags/widgets/label.js";

import options from "../../utils/options";

const lockButton = () => {
    let cmd = "swaylock -f --color 504945 -F --ring-ver-color 458588 --indicator-idle-visible --inside-color 83A598 --line-color FABD2F --ring-color FABD2F";
    return Widget.Button({
        vpack: "end",
        cursor: "pointer",
        className: "lock-button",
        child: Widget.Icon({
            icon: options.icons.lock,
            className: "lock-button-icon",
            size: options.sizes.lockButton,
        }),
        onClicked: () => {
            Utils.exec(`${cmd}`);
        },
    })
}

export default lockButton;