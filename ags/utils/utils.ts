import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import Gdk from "gi://Gdk";

export function range(length :number, start = 1){
    return Array.from({length}, (_, i) => i + start);
}

export const forMonitor = (bar : (monitor : number) => Gtk.Window) => {
    const number = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(number, 0).flatMap(bar);
}

export function maxToPercent(max :number, value :number) {
    return  value / max;
}

