const lockButton = () => {
    let cmd = "swaylock -f --color 504945 -F --ring-ver-color 458588 --indicator-idle-visible --inside-color 83A598 --line-color FABD2F --ring-color FABD2F";
    let icon = "";
    return Widget.Button({
        vpack: "end",
        cursor: "pointer",
        class_name: "lock-button",
        child: Widget.Label( {
            label: `${icon}`,
            justification: "center",
            class_name: "lock-button-icon",

        }),
        onClicked: () => {
            Utils.exec(`${cmd}`);
        }
    })
}

export default lockButton;