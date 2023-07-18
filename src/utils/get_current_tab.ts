//現在のタブを取得し、callbackを実行
export default function getCurrentTab() {
    return new Promise<chrome.tabs.Tab>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]);
        });
    });
}
