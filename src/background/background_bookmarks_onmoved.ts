import isBookmarkInWorkingDirectory from "../utils/is_bookmark_in_working_directory";
import * as StorageLocalInterface from "../utils/storage_local_interface";
import {
    BookmarkProccessDeleted,
    BookmarkProcessRegistered,
} from "../types/bookmark_process_type";
import sendMessageToTab from "../utils/send_message_to_tab";
import { MessageB2COnBookmarkMovedInType } from "../types/message_b2c_type";

//ワーキングディレクトリ内 -> 外への移動
async function backgroundBookmarksOnMovedOut(id: string) {
    const process: BookmarkProccessDeleted = {
        stage: "DELETED",
        id: id,
    };
    await StorageLocalInterface.pushToProcessQueue(process);
}

//ワーキングディレクトリ外 -> 内への移動
async function backgroundBookmarksOnMovedIn(
    id: string,
    change_info: chrome.bookmarks.BookmarkMoveInfo
) {
    const bookmark = (await chrome.bookmarks.get(id))[0];
    const url = bookmark.url;
    //全タブを走査し、該当urlが開いていれば、そのタブのbodyを取得し、process queueに追加
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
        if (tab.url === url && tab.status === "complete") {
            const message: MessageB2COnBookmarkMovedInType = {
                type: "BOOKMARK_MOVED_IN",
            };
            type response_type = {
                body: string;
            };
            const response = await sendMessageToTab<response_type>(
                tab,
                message
            );
            //TODO:ファイルまるごと持ってこられた場合はそのうち
            const process: BookmarkProcessRegistered = {
                stage: "REGISTERED",
                id,
                title: bookmark.title,
                body: response.body,
                url: bookmark.url as string,
            };
            await StorageLocalInterface.pushToProcessQueue(process);
            return;
        }
    }
    //どのタブでも該当urlを開いていなければ、とりあえずワーキングディレクトリからブックマークを外す
    const new_destination = {
        index: change_info.oldIndex,
        parentId: change_info.oldParentId,
    };
    await chrome.bookmarks.move(id, new_destination);
}

export default async function backgroundBookmarksOnMoved(
    id: string,
    changeInfo: chrome.bookmarks.BookmarkMoveInfo
) {
    console.log(id);
    console.log(changeInfo);
    console.log("backgroundBookmarksOnMoved");
    const in_workdir_before = await isBookmarkInWorkingDirectory(
        changeInfo.oldParentId
    );
    const in_workdir_after = await isBookmarkInWorkingDirectory(
        changeInfo.parentId
    );
    if (in_workdir_before && !in_workdir_after) {
        await backgroundBookmarksOnMovedOut(id);
    } else if (!in_workdir_before && in_workdir_after) {
        await backgroundBookmarksOnMovedIn(id, changeInfo);
    }
}
