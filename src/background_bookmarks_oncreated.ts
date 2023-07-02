import { BookmarkProcess, BookmarkProcessRegistered } from "./types/bookmark_process_type";
import { MessageB2COnRegisteredType, MessageB2CType } from "./types/message_b2c_type";
import { StorageLocalGet, StorageLocalSet } from "./utils/storage_local";


//ブックマークが追加されたら、実行される関数
export default async function backgroundBookmarksOnCreated(id: string, bookmark: chrome.bookmarks.BookmarkTreeNode) {
    const tab = await getCurrentTab();
    type response_type = {
        title: string,
        body: string,
        url: string,
    };
    const message: MessageB2COnRegisteredType = {
        type: 'REGISTERED',
    };
    //contentにメッセージを送り、開いているページのhtmlを取得する
    const response = await sendMessageToTab<response_type>(tab, message);
    //html本文を、タスクキューに追加
    const storage_local = await StorageLocalGet(['process_queue']);
    const process_queue: BookmarkProcess[] = storage_local['process_queue'] ?? [];
    const new_process: BookmarkProcessRegistered = {
        stage: 'REGISTERED',
        id: bookmark.id,
        ...response,
    };
    process_queue.push(new_process);
    await StorageLocalSet({
        process_queue,
    });
}

//現在のタブを取得し、callbackを実行
function getCurrentTab() {
    return new Promise<chrome.tabs.Tab>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]);
        });
    });
}

//指定したタブにメッセージを送信、callbackを実行
function sendMessageToTab<ResponseType>(tab: chrome.tabs.Tab, message: MessageB2CType) {
    return new Promise((resolve: (response: ResponseType) => void) => {
        chrome.tabs.sendMessage(tab.id!, message, (response) => {
            resolve(response);
        });
    });
}