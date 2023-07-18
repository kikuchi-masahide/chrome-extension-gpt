import { BookmarkProcessRegistered } from "../types/bookmark_process_type";
import { MessageB2COnRegisteredType } from "../types/message_b2c_type";
import isBookmarkInWorkingDirectory from "../utils/is_bookmark_in_working_directory";
import * as StorageLocalInterface from "../utils/storage_local_interface";
import getCurrentTab from "../utils/get_current_tab";
import sendMessageToTab from "../utils/send_message_to_tab";

//ブックマークが追加されたら、実行される関数
export default async function backgroundBookmarksOnCreated(
    id: string,
    bookmark: chrome.bookmarks.BookmarkTreeNode
) {
    console.log(bookmark);
    if (!(await isBookmarkInWorkingDirectory(bookmark.id))) {
        console.log("not in working directory");
        return;
    }
    const tab = await getCurrentTab();
    type response_type = {
        title: string;
        body: string;
        url: string;
    };
    const message: MessageB2COnRegisteredType = {
        type: "REGISTERED",
    };
    //contentにメッセージを送り、開いているページのhtmlを取得する
    const response = await sendMessageToTab<response_type>(tab, message);
    //html本文を、タスクキューに追加
    const new_process: BookmarkProcessRegistered = {
        stage: "REGISTERED",
        id: bookmark.id,
        ...response,
    };
    await StorageLocalInterface.pushToProcessQueue(new_process);
}
