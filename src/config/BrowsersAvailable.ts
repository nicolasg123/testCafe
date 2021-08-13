
export const RunnableBrowsers = {
    // chrome : "saucelabs:Chrome@75.0:Windows 7",
    chrome : "chrome",
    chromeHeadless : "chrome:headless",
    chromeSaucelabs : "saucelabs:Chrome@75.0:Windows 7",
    chromeLocal : "chrome",
    firefox : "saucelabs:Firefox@67.0:Windows 10",
    firefoxSaucelabs : "saucelabs:Firefox@67.0:Windows 10",
    firefoxLocal : "firefox",
    safari : "saucelabs:Safari@12.0:macOS 10.14",
    safariSaucelabs : "saucelabs:Safari@12.0:macOS 10.14",
    safariLocal : "safari",
    edge : "saucelabs:MicrosoftEdge@18.17763:Windows 10",
    edgeSaucelabs : "saucelabs:MicrosoftEdge@18.17763:Windows 10",
    edgeLocal : "edge:/Applications/Microsoft Edge Beta",
    chromiumHeadless: "chromium:headless",
    firefoxHeadless: "firefox:headless",
    chromeDocker : "chrome --disable-background-timer-throttling --no-sandbox --disable-gpu -incognito --window-size=1200,1000",
    firefoxDocker : "firefox"
};

export function getRunnableBrowser(bname: string): string{
    // @ts-ignore
    return RunnableBrowsers[bname];
}
