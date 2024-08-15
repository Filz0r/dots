import { divide } from "./utils";
import env from "../env.json";

/* WINDOW VARIABLES */
export const showQuickSettings = Variable(false);

/* SYSTEM STATS VARIABLES */
export const loadAverage = Variable("", {
  poll: [
    1000,
    [
      "bash",
      "-c",
      'uptime | awk \'{if (NF >= 11) {gsub(/,/, "", $9); gsub(/,/, "", $10); print $9, $10, $11} else {gsub(/,/, "", $8); gsub(/,/, "", $9); print $8, $9, $10}}\'',
    ],
    (out) => out,
  ],
});

export const updateCounter = Variable(0, {
  poll: [
    1800000,
    ["bash", "-c", "echo $(($(checkupdates | wc -l) + $(yay -Qum | wc -l)))"],
    (out) => parseInt(out) || 0,
  ],
});

export const uptime = Variable("", {
  poll: [
    60000,
    ["bash", "-c", "uptime | awk '{gsub(/[,]/, \"\", $3);print $3}'"],
    (out) => out,
  ],
});

export const cpuName = Variable("", {
  poll: [
    36000000,
    [
      "bash",
      "-c",
      'grep "model name" /proc/cpuinfo | head -1 | awk -F: \'{print $2}\' | sed \'s/^[ \t]*//;s/[ \t]*$//\' | awk -F@ \'{gsub(/CPU/, "", $1); gsub(/\\(R\\)/, "", $1); gsub(/\\(TM\\)/, "", $1); print $1}\'',
    ],
    (out) => out,
  ],
});

export const cpuThreadCount = Variable(0, {
  poll: [
    36000000,
    ["bash", "-c", "lscpu | grep -i -e '^cpu(s):' | awk '{print $2}'"],
    (out) => parseInt(out),
  ],
});

export const cpuCoreCount = Variable(0, {
  poll: [
    36000000,
    [
      "bash",
      "-c",
      "lscpu | grep -i -e 'Core(s) per socket:' | awk -F: '{print $2}'",
    ],
    (out) => parseInt(out),
  ],
});

/* CPU STATS VARIABLES */
export const cpuUsageValue = Variable(0, {
  poll: [
    2000,
    "top -b -n 1",
    (out) =>
      divide([
        100,
        // @ts-ignore
        out
          .split("\n")
          .find((line) => line.includes("Cpu(s)"))
          .split(/\s+/)[1]
          .replace(",", "."),
      ]),
  ],
});

export const cpuFanSpeed = Variable(0, {
  poll: [
    1000,
    ["bash", "-c", "sensors | grep fan1 | awk '{print $2}'"],
    (out) => parseInt(out),
  ],
});

export const cpuTemperature = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    [
      "bash",
      "-c",
      'sensors | grep -i "CPU" | awk \'{gsub(/[+°C]/, "", $2); print $2}\'',
    ], // Command
    (out: string) => parseInt(out), // Callback function
  ],
});

/* RAM STATS VARIABLES */
export const ramUsageValue = Variable(0, {
  poll: [
    2000,
    "free",
    (out) =>
      divide(
        // @ts-ignore
        out
          .split("\n")
          .find((line) => line.includes("Mem:"))
          .split(/\s+/)
          .splice(1, 2),
      ),
  ],
});

export const ramAvailable = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'mem:' | awk '{ print $7  / 1000024}' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const ramUsed = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'mem:' | awk '{ print $3  / 1000024}' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const ramCached = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'mem:' | awk '{ print $6  / 1000024}' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const ramFree = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'mem:' | awk '{ print $4  / 1000024}' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const ramTotal = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'mem:' | awk '{ print $2  / 1000024}' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const ramShared = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'mem:' | awk '{ print $5  / 1000024}' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const swapUsed = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'swap:' | awk '{ print $3 / 1000024 }' "], // Command
    (out: string) => parseFloat(out), // Callback function
  ],
});

export const swapFree = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'swap:' | awk '{ print $4 / 1000024 }' "], // Command
    (out: string) => parseInt(out), // Callback function
  ],
});

export const swapTotal = Variable(0.0, {
  poll: [
    1000, // time in milliseconds
    ["bash", "-c", "free  | grep -i 'swap:' | awk '{ print $2 / 1000024 }' "], // Command
    (out: string) => parseInt(out), // Callback function
  ],
});

/* STORAGE STATS VARIABLES */
export const storageValue = Variable(0, {
  // @ts-ignore
  poll: [
    2000,
    "df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs --total",
    (out) => {
      const total = out.split("\n").find((line) => line.includes("total"));
      const percentage = total
        ? parseInt(total.split(/\s+/)[4].replace("%", ""))
        : 0;
      return percentage / 100;
    },
  ],
});

export const storageTotalRoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/root" | awk \'{gsub(/[A-Z]/, "", $2); print $2}\'',
    ],
  ],
});

export const storageFreeRoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/root" | awk \'{gsub(/[A-Z]/, "", $4); print $4}\'',
    ],
  ],
});

export const storageUsedRoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/root" | awk \'{gsub(/[A-Z]/, "", $3); print $3}\'',
    ],
  ],
});

export const storagePercentRoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/root" | awk \'{gsub(/[%]/, "", $5); print $5}\'',
    ],
  ],
});

export const storageTotalHome = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/home" | awk \'{gsub(/[A-Z]/, "", $2); print $2}\'',
    ],
  ],
});

export const storageFreeHome = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/home" | awk \'{gsub(/[A-Z]/, "", $4); print $4}\'',
    ],
  ],
});

export const storageUsedHome = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/home" | awk \'{gsub(/[A-Z]/, "", $3); print $3}\'',
    ],
  ],
});

export const storagePercentHome = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/home" | awk \'{gsub(/[%]/, "", $5); print $5}\'',
    ],
  ],
});

export const storageTotalBoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/boot" | awk \'{gsub(/[A-Z]/, "", $2); print $2}\'',
    ],
  ],
});

export const storageFreeBoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/boot" | awk \'{gsub(/[A-Z]/, "", $4); print $4}\'',
    ],
  ],
});

export const storageUsedBoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/boot" | awk \'{gsub(/[A-Z]/, "", $3); print $3}\'',
    ],
  ],
});

export const storagePercentBoot = Variable(0, {
  poll: [
    2000,
    [
      "bash",
      "-c",
      'df -h --exclude=tmpfs --exclude=efivarfs --exclude=devtmpfs | grep "/root" | awk \'{gsub(/[%]/, "", $5); print $5}\'',
    ],
  ],
});

/* TIME STATS VARIABLES */
export const hours = Variable("", {
  poll: [1000, 'date "+%H"'],
});

export const minutes = Variable("", {
  poll: [1000, 'date "+%M"'],
});

export const dayOfWeek = Variable("", {
  poll: [3600000, "date +%A", (out) => out],
});

export const date = Variable("", {
  poll: [3600000, "date +%D", (out) => out],
});

/* NETWORK STATS VARIABLES */
export const NETWORK_INTERFACE = env["network-interface"];
export const WEATHER_LOCATIONS = env["locations"];

export const networkAddress = Variable("", {
  poll: [
    2000,
    [
      "bash",
      "-c",
      `ip a show ${NETWORK_INTERFACE} | grep -i "inet " | awk '{print $2}' | sed  's/\\/[1-9]\\{1,2\\}$//'`,
    ],
    (out: string) => out,
  ],
});

export const downloadSpeed = Variable(0, {
  poll: [
    1000,
    [
      "bash",
      "-c",
      `sar -n DEV 1 1 | grep 'Average:' | grep ${NETWORK_INTERFACE} | awk '{print $5 / 1024}'`,
    ],
    (out: string) => parseFloat(out),
  ],
});

export const uploadSpeed = Variable(0, {
  poll: [
    1000,
    [
      "bash",
      "-c",
      `sar -n DEV 1 1 | grep 'Average:' | grep ${NETWORK_INTERFACE} | awk '{print $6 / 1024}'`,
    ],
    (out: string) => parseFloat(out),
  ],
});

/* WEATHER STATS VARIABLES */
export const defaultLocation = Variable(WEATHER_LOCATIONS[0]);

export const currentWeather = Variable("", {
  poll: [
    1800000,
    [
      "bash",
      "-c",
      `curl "https://wttr.in/${defaultLocation.value}?format=3" | awk '{gsub(/[+]/, "", $3);print $3" "$2}'`,
    ],
    (out) => (out === "please location;" ? "Down :(" : out),
  ],
});

export const quickSettingsVars = {
  show: showQuickSettings,
  cpu: cpuUsageValue,
  cpuTemp: cpuTemperature,
  ram: ramUsageValue,
  freeRam: ramAvailable,
  storage: storageValue,
  updates: updateCounter,
};
