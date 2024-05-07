export async function bash(strings :TemplateStringsArray | string, ...args :unknown[]) {
    const cmd = typeof strings === "string" ? strings : strings
        .flatMap((str, i) => str + `${args[i] ?? ""}`).join("");

    return Utils.execAsync(["bash", "-c", cmd]).catch(e => {
        console.error(`Could not execute command: ${cmd}\nErrorMessage: ${e}`);
        return "";
    });
}

export async function shell(cmd: string | string[]) {
    return Utils.execAsync(cmd).catch(e => {
        console.error(`Could not execute command: ${cmd}\nErrorMessage: ${e}`);
        return "";
    });
}