import { showQuickSettings } from "../../../utils/variables";

const QuickSettingsButton = () =>
  Widget.Button({
    className: "quick-settings-btn",
    cursor: "pointer",
    child: Widget.Icon({
      className: "quick-settings-btn-icon",
      icon: "open-menu-symbolic",
      size: 18,
    }),
    onClicked: () => {
      showQuickSettings.value = !showQuickSettings.value;
    },
  });

export default QuickSettingsButton;
