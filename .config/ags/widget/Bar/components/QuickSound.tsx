import Wp from "gi://AstalWp";
import {bind, Variable} from "astal";
import {Gtk} from "astal/gtk3";

const reveal = Variable<boolean>(false);

function AudioSlider() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    return <box className="AudioSlider" css="min-width: 140px">

        <slider
            hexpand
            onDragged={({ value }) => speaker.volume = value}
            value={bind(speaker, "volume")}
        />
    </box>
}

const revealHandler = (self :Gtk.EventBox) => {
    const box: Gtk.Box = self.get_child() as Gtk.Box
    const revealer: Gtk.Revealer = box.get_children()[1] as Gtk.Revealer
    reveal.set(true);
    revealer.revealChild = reveal.get()
}

const revealClose = (self: Gtk.EventBox) => {
    const box: Gtk.Box = self.get_child() as Gtk.Box
    const revealer: Gtk.Revealer = box.get_children()[1] as Gtk.Revealer
    reveal.set(false);
    revealer.revealChild = reveal.get()
}

export default function QuickSound() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!


    return <eventbox onHover={revealHandler}
    onHoverLost={(self) => {
        revealClose(self as Gtk.EventBox);
    }}
    tooltipText={bind(speaker, "volume").as(vol => `${Math.round(vol * 100)}%`)}
    // tooltipText={`${bind(speaker, "volume")}`}
    >
        <box>
            <icon icon={bind(speaker, "volumeIcon")} />
            <revealer
                className="AudioRevealer"
                setup={self => self.revealChild = reveal().get()}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}>
                <AudioSlider />
            </revealer>
        </box>

    </eventbox>

}