#!/usr/bin/env bash

TMP="$HOME/.ui"
# echo "TMP: $TMP"
STATUS_FILE="$TMP/status_wireguard"
# echo "file: $STATUS_FILE"
WIREGUARD_STATUS="$(sudo wg | wc -w)"

get_status() {
    if [ $WIREGUARD_STATUS -eq 0 ]; then
        echo "off"
    else
        echo "on"
    fi
}

if [ ! -d "$TMP" ];then mkdir -p $TMP; fi

if [ ! -f "$STATUS_FILE" ]; then
    echo $(get_status) > $STATUS_FILE
fi

get_int_status() {
    if [ $WIREGUARD_STATUS -eq 0 ]; then
        return 0
    else
        return 1
    fi
}

get_wireguard_info() {
    sudo wg | awk '
    BEGIN {
        interface = "";
        endpoint = "";
        allowed_ips = "";
        latest_handshake = "";
        transfer_received = "";
        transfer_sent = "";
    }
    /interface:/ { interface = $2 }
    /endpoint:/ { endpoint = $2 }
    /allowed ips:/ {
        if (allowed_ips != "") {
            allowed_ips = allowed_ips ", " substr($0, index($0,$3))
        } else {
            allowed_ips = substr($0, index($0,$3))
        }
    }
    /latest handshake:/ { latest_handshake = $3 " " $4 " " $5 }
    /transfer:/ {
        transfer_received = $2 " " $3
        transfer_sent = $5 " " $6
    }
    END {
        print "{";
        print "\"interface\": \"" interface "\",";
        print "\"endpoint\": \"" endpoint "\",";
        print "\"allowed_ips\": \"" allowed_ips "\",";
        print "\"latest_handshake\": \"" latest_handshake "\",";
        print "\"transfer_received\": \"" transfer_received "\",";
        print "\"transfer_sent\": \"" transfer_sent "\"";
        print "}";
    }'
}

case $1 in
    status)
        get_status
    ;;
    start)
        if [ "$(get_status)" == "on" ]; then
            echo "Already running"
            exit 0
        fi
        # echo "Starting Wireguard"
        wg-quick up wg0 #&> /dev/null
        echo "on" > $STATUS_FILE
        echo "on"
    ;;
    stop)
        if [ "$(get_status)" == "off" ]; then
            echo "Already Off"
            exit 0
        fi
        # echo "Stopping Wireguard"
        wg-quick down wg0 #&> /dev/null
        echo "off" > $STATUS_FILE
        echo "off"
    ;;
    info)
        if [ "$(get_status)" == "off" ]; then
            echo "Wireguard is not running"
            exit 0
        fi
        get_wireguard_info
    ;;
    *)
        echo "Usage: $0 {start|stop|status|info}"
        exit 69
    ;;
esac

formatted_date=$(date +'%d_%m_%Y_%H_%M_%S')
echo "called $0 $1" > "$HOME/.ui/logs/wireguard-$formatted_date.log"
