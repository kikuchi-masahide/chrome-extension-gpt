import { MessageB2CType } from "../types/message_b2c_type";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    message = message as MessageB2CType;
    if (message.type === "REGISTERED") {
        sendResponse(onBookmarkRegistered());
    } else if (message.type === "BOOKMARK_MOVED_IN") {
        sendResponse(onBookmarkMovedIn());
    }
    return true;
});

//ブックマーク登録でbackgroundからメッセージが来たときのcallback
function onBookmarkRegistered() {
    const body = document.body.innerText;
    const title = document.title;
    const url = window.location.href;
    const ret = {
        title,
        body,
        url,
    };
    return ret;
}

function onBookmarkMovedIn() {
    const body = document.body.innerText;
    const ret = {
        body,
    };
    return ret;
}
