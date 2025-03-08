#!/bin/env bash

# Set strict bash behavior
set -euo pipefail

# Get the current active workspace info
current_workspace_info=$(hyprctl activeworkspace)

# Get the monitor the workspace is currently on
current_monitor_id=$(echo "$current_workspace_info" | grep "monitorID:" | awk '{print $2}')

# Get the total number of monitors
monitors_info=$(hyprctl monitors)
monitor_count=$(echo "$monitors_info" | grep -c "Monitor ")

# For debugging
echo "Current monitor ID: $current_monitor_id"
echo "Total monitors: $monitor_count"

# Check argument
if [[ "$1" == "+" ]]; then
    # Cycle forward
    target_monitor_id=$(( (current_monitor_id + 1) % monitor_count ))
    echo "Cycling forward to monitor $target_monitor_id"
elif [[ "$1" == "-" ]]; then
    # Cycle backward with explicit check for monitor 0
    if [[ "$current_monitor_id" -eq 0 ]]; then
        target_monitor_id=$(( monitor_count - 1 ))
    else
        target_monitor_id=$(( current_monitor_id - 1 ))
    fi
    echo "Cycling backward to monitor $target_monitor_id"
else
    echo "Usage: $0 [+|-]"
    echo "  + : cycle forward to next monitor"
    echo "  - : cycle backward to previous monitor"
    exit 1
fi

# Move the current workspace to the target monitor
echo "Executing: hyprctl dispatch movecurrentworkspacetomonitor $target_monitor_id"
hyprctl dispatch movecurrentworkspacetomonitor $target_monitor_id