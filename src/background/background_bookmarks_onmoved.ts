import isBookmarkInWorkingDirectory from "../utils/is_bookmark_in_working_directory";
import * as StorageLocalInterface from "../utils/storage_local_interface";
import { BookmarkProccessDeleted } from "../types/bookmark_process_type";

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
        const process: BookmarkProccessDeleted = {
            stage: "DELETED",
            id: id,
        };
        await StorageLocalInterface.pushToProcessQueue(process);
    } else if (!in_workdir_before && in_workdir_after) {
        //TODO: notifyに追加
        console.log("ページ情報が取得できません");
    }
}
