import { exec } from "astal/process"
import {App} from "astal/gtk3"

const CSS_FILE = "/tmp/style.css"

export default function resetCss() {
    exec("sass ./style/style.scss /tmp/style.css")
    App.apply_css(CSS_FILE)
}