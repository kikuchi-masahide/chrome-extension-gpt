import { MessageB2CType } from "./types/message_b2c_type";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    message = message as MessageB2CType;
    if (message.type == 'REGISTERED') {
        sendResponse(onBookmarkRegistered());
    }
    return true;
});

//ブックマーク登録でbackgroundからメッセージが来たときのcallback
function onBookmarkRegistered() {
    const serializer = new XMLSerializer();
    const body = serializer.serializeToString(document.body);
    const title = document.title;
    const url = window.location.href;
    const ret = {
        title,
        body,
        url,
    };
    return ret;
}