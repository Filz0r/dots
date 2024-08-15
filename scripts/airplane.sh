#!/usr/bin/env bash

TEMP_DIR="$HOME/.ui/airplane"
mkdir -p $TEMP_DIR

check_wifi() {
    WIFI_STATUS=$(nmcli radio wifi)
    if [ "$WIFI_STATUS" == "disabled" ]; then
        echo "off"
    else
        echo "on"
    fi
}

check_wired() {
    WIRED_STATUS=$(nmcli device status | grep ethernet | awk '{print $3}')
    if [ "$WIRED_STATUS" == "disconnected" ]; then
        echo "off"
    else
        echo "on"
    fi
}

check_bluetooth() {
    BLUETOOTH_STATUS=$(bluetoothctl show | grep Powered | awk '{print $2}')
    if [ "$BLUETOOTH_STATUS" == "no" ]; then
        echo "off"
    else
        echo "on"
    fi
}

check_wireguard() {
    WIREGUARD_STATUS=$(sudo wg | wc -w)
    if [ $WIREGUARD_STATUS -eq 0 ]; then
        echo "off"
    else
        echo "on"
    fi
}


check_airplane_mode_debug() {
    WIFI=$(check_wifi)
    WIRED=$(check_wired)
    BLUETOOTH=$(check_bluetooth)
    WIREGUARD=$(check_wireguard)

    echo "WiFi: $WIFI"
    echo "Wired: $WIRED"
    echo "Bluetooth: $BLUETOOTH"
    echo "WireGuard: $WIREGUARD"

    if [ "$WIFI" == "off" ] && [ "$WIRED" == "off" ] && [ "$BLUETOOTH" == "off" ] && [ "$WIREGUARD" == "off" ]; then
        echo "Airplane mode is ON"
    else
        echo "Airplane mode is OFF"
    fi
}

check_airplane_mode() {
    WIFI=$(check_wifi)
    WIRED=$(check_wired)
    BLUETOOTH=$(check_bluetooth)
    WIREGUARD=$(check_wireguard)

    if [ "$WIFI" == "off" ] && [ "$WIRED" == "off" ] && [ "$BLUETOOTH" == "off" ] && [ "$WIREGUARD" == "off" ]; then
        echo "on"
    else
        echo "off"
    fi
}

case $1 in
    wifi)
        check_wifi
    ;;
    wired)
        check_wired
    ;;
    bluetooth)
        check_bluetooth
    ;;
    wireguard)
        check_wireguard
    ;;
    debug)
        check_airplane_mode_debug
    ;;
    status)
        check_airplane_mode
    ;;
    toggle)
        toggle_airplane_mode
    ;;
    *)
        echo "Usage: $0 {wifi|wired|bluetooth|wireguard|status|toggle}"
        exit 1
    ;;
esac
