const main = '/tmp/ags/main.js';
const style = '/tmp/ags/style.css';

Utils.monitorFile(
    `${App.configDir}/style`,

    ()=> {

        const scss = `${App.configDir}/style/style.scss`;

        Utils.exec(`sassc ${scss} ${style}`);
        App.resetCss();
        App.applyCss(style);
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
    await Utils.execAsync([
        'sassc', `${App.configDir}/style/style.scss`, '/tmp/ags/style.css'
    ]);
    await import(`file://${main}`);
} catch (error) {
    console.error(error);
    App.quit();
}

export {}