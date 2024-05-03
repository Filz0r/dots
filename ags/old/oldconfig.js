import {leftBar} from "./LeftBar/LeftBar.js";

const mpris = await Service.import("mpris")
const audio = await Service.import("audio")


Utils.monitorFile(
    `${App.configDir}/style`,

    ()=> {

        const scss = `${App.configDir}/style/style.scss`;

        const css = `${App.configDir}/style.css`;

        Utils.exec(`sassc ${scss} ${css}`);
        App.resetCss();
        App.applyCss(css);
    },
);

// function ClientTitle() {
//     return Widget.Label({
//         class_name: "client-title",
//         label: hyprland.active.client.bind("title"),
//     })
// }





// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself



function Media() {
    const label = Utils.watch("", mpris, "player-changed", () => {
        if (mpris.players[0]) {
            const { track_artists, track_title } = mpris.players[0]
            return `${track_artists.join(", ")} - ${track_title}`
        } else {
            return "Nothing is playing"
        }
    })

    return Widget.Button({
        class_name: "media",
        on_primary_click: () => mpris.getPlayer("")?.playPause(),
        on_scroll_up: () => mpris.getPlayer("")?.next(),
        on_scroll_down: () => mpris.getPlayer("")?.previous(),
        child: Widget.Label({ label }),
    })
}


function Volume() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    const icon = Widget.Icon({
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
    })

    const slider = Widget.Slider({
        hexpand: true,
        draw_value: false,
        // vertical: true,
        min: 0,
        max: 100,
        on_change: ({ value }) => audio.speaker.volume = value,
        setup: self => self.hook(audio.speaker, () => {
            self.value = audio.speaker.volume || 0
        }),
    })

    return Widget.Box({
        class_name: "volume",
        css: "min-width: 180px",
        children: [icon, slider],
    })
}








// layout of the bar
// function Left() {
//     return Widget.Box({
//         spacing: 8,
//         children: [
//             Workspaces(),
//             ClientTitle(),
//         ],
//     })
// // }
//
// function Center() {
//     return Widget.Box({
//         spacing: 8,
//         children: [
//             Media(),
//             Notification(),
//         ],
//     })
// }
//
// function Right() {
//     return Widget.Box({
//         hpack: "end",
//         spacing: 8,
//         children: [
//             //Volume(),
//             //BatteryLabel(),
//             //Clock(),
//             SysTray(),
//         ],
//     })
// }
//
// function RLeft() {
//     return Widget.Box({
//         hpack: "end",
//         spacing: 8,
//         children: [
//             BatteryLabel(),
//         ],
//     })
// }
// function Bar(monitor = 0) {
//     return Widget.Window({
//         name: `bar-${monitor}`, // name has to be unique
//         class_name: "bar",
//         monitor,
//         anchor: ["top", "left", "right"],
//         exclusivity: "exclusive",
//         child: Widget.CenterBox({
//             start_widget: Left(),
//             center_widget: Center(),
//             end_widget: Right(),
//         }),
//     })
// }




App.config({
    style: "/home/filipe/.config/ags/style.css",
    gtkTheme: "gruvbox-dark-gtk",
    windows: [
        // Bar(),
        leftBar(),
        // you can call it, for each monitor
        // Bar(0),
        // Bar(1)
    ],
})

export { }
