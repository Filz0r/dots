const main = '/tmp/ags/main.js';

Utils.monitorFile(
    `${App.configDir}/style`,

    ()=> {

        const scss = `${App.configDir}/style/style.scss`;

        const css = `${App.configDir}/style.css`;

        Utils.exec(`sassc ${scss} ${css}`);
        App.resetCss();
        App.applyCss(css);
    },
);

try {
    await Utils.execAsync([
        'bun', 'build', `${App.configDir}/main.ts`,
        '--outfile', main,
        '--external', 'resource://*',
        '--external', 'gi://*',
        '--external', 'file://*',
    ]);
    await import(`file://${main}`);
} catch (error) {
    console.error(error);
    App.quit();
}

export {}