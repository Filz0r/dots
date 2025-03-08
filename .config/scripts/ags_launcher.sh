#!/usr/bin/env bash

LAUNCH_DATE=$(date +"%Y-%m-%d-%H-%M")
LOG_NAME="ags-$LAUNCH_DATE.log"
ags run --log-file "$HOME/.config/ags/logs/$LOG_NAME" &