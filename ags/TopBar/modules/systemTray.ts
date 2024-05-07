import { TrayItem } from "types/service/systemtray";
import Brightness from "services/Brightness";


const network = await Service.import("network");
const systray = await Service.import('systemtray');
const audio = await Service.import('audio')

const volumeIndicator = () => Widget.Button({
    on_clicked: () => {
        audio.speaker.is_muted = !audio.speaker.is_muted
        audio.speaker.volume = audio.speaker.is_muted ? 0 : 1;
    },
    className: "system-tray-item brightness-icon",
    child: Widget.Icon().hook(audio.speaker, self => {
        const vol = audio.speaker.volume * 100;
        const icon = [
            [101, 'overamplified'],
            [67, 'high'],
            [34, 'medium'],
            [1, 'low'],
            [0, 'muted'],
            // @ts-ignore
        ].find(([threshold]) => threshold <= vol)?.[1];

        self.icon = `audio-volume-${icon}-symbolic`;
        self.tooltip_text = `Volume ${Math.floor(vol)}%`;
    }),
});

const getCorrectIcon = () :string =>  {
    if (Brightness.screen == 1)
        return "󰃠";
    else if (Brightness.screen >= 0.7)
        return "󰃟";
    else
        return "󰃞";
}

const brightnessIcon = () => {

    const icon = Widget.Label({
        label: getCorrectIcon(),
        setup: (w) => {
            w.hook(Brightness, (self) => self.label = getCorrectIcon());
        }
    });
    return Widget.Button({
        className: "system-tray-item brightness-icon",
        child: icon,
        visible: Brightness.screen > 0 && Brightness.screen < Brightness.screenMax,
        onClicked: (w) => {
            if (Brightness.screen >= 1) {
                Brightness.screen = 0.7;
                w.child.label = getCorrectIcon();
            } else if (Brightness.screen >= 0.7) {
                Brightness.screen = 0.4;
                w.child.label = getCorrectIcon();
            } else {
                Brightness.screen = 1;
                w.child.label = getCorrectIcon();
            }
        },
    })
}


const wifiIcon = () => Widget.Box({
    visible: network.primary === "wifi",
    cursor: "pointer",
    tooltipText: network.wifi.bind('ssid')
        .as(ssid => ssid || "Unknown"),
    children: [
        Widget.Icon({
            className: "system-tray-item wifi-icon",
            icon: network.wifi.bind('icon_name'),
        }),
    ],
});

const ethernetIcon = () => Widget.Box({
    visible: network.primary === "wired",
    cursor: "pointer",
    // tooltipText: network.wired.
    children: [
        Widget.Icon({
            className: "system-tray-item ethernet-icon",
            icon: network.wired.bind('icon_name'),
        }),
    ],
})

const systemTrayItem = (item : TrayItem) => {
    // console.log("huh")
    return Widget.Button({
        className: "system-tray-item",
        child: Widget.Icon({className: "system-tray-icon"}).bind('icon', item, 'icon'),
        tooltipMarkup: item.bind('tooltip_markup'),
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (_, event) => item.openMenu(event),
    })
};

const systemTray = () => {
    // console.log("hello");
    const _systray = Widget.Box({
        className: "systray",
        children: systray.bind('items').as(i => i.map(systemTrayItem)),
    });


    const networkMenu = Widget.Box({
      className: "network-menu",
      cursor: "pointer",
      children: [
            wifiIcon(),
            // ethernetIcon(),
      ],
    })
    return Widget.Box({
      className: "system-tray",
      children: [
          _systray,
          volumeIndicator(),
          networkMenu,
          brightnessIcon(),
      ],
    })
}

export default systemTray;