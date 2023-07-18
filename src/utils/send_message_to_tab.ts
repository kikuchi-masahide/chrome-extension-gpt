import { MessageB2CType } from "../types/message_b2c_type";

//指定したタブにメッセージを送信、callbackを実行
export default function sendMessageToTab<ResponseType>(
    tab: chrome.tabs.Tab,
    message: MessageB2CType
) {
    return new Promise((resolve: (response: ResponseType) => void) => {
        chrome.tabs.sendMessage(tab.id!, message, (response) => {
            resolve(response);
        });
    });
}
