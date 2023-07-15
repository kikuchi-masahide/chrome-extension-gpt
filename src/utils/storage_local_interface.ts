import { BookmarkProcess } from "../types/bookmark_process_type";
import BookmarkDataType from "../types/bookmark_data_type";

async function pushToProcessQueue(process: BookmarkProcess) {
    const storage_local = await StorageLocalGet(["process_queue"]);
    const process_queue: BookmarkProcess[] =
        storage_local["process_queue"] ?? [];
    process_queue.push(process);
    await StorageLocalSet({
        process_queue,
    });
}

//「process_queueから先頭の要素を取り出し、それを引数としてcallbackに渡し、callbackが成功すれば先頭要素を削除する」という流れのpromiseを返す
function popFromProcessQueue(
    callback:
        | ((process: BookmarkProcess | undefined) => void)
        | ((process: BookmarkProcess | undefined) => Promise<void>)
) {
    const get_first_process = async () => {
        const storage_local = await StorageLocalGet(["process_queue"]);
        const process_queue: BookmarkProcess[] = storage_local["process_queue"];
        if (process_queue === undefined) return undefined;
        return process_queue[0];
    };
    const pop_first_process = async () => {
        const storage_local = await StorageLocalGet(["process_queue"]);
        const process_queue: BookmarkProcess[] =
            storage_local["process_queue"] ?? [];
        process_queue.shift();
        await StorageLocalSet({
            process_queue,
        });
    };
    return get_first_process().then(callback).then(pop_first_process);
}

async function addToSavedBookmarks(bookmark_data: BookmarkDataType) {
    const storage_local = await StorageLocalGet(["saved_bookmarks"]);
    const saved_bookmarks = storage_local.saved_bookmarks
        ? (storage_local.saved_bookmarks as BookmarkDataType[])
        : new Array<BookmarkDataType>();
    const index = saved_bookmarks.findIndex(
        (bookmark) => bookmark.id === bookmark_data.id
    );
    if (index === -1) saved_bookmarks.push(bookmark_data);
    else saved_bookmarks[index] = bookmark_data;
    await StorageLocalSet({ saved_bookmarks });
}

async function deleteFromSavedBookmarks(bookmark_id: string) {
    const storage_local = await StorageLocalGet(["saved_bookmarks"]);
    const saved_bookmarks = storage_local.saved_bookmarks
        ? (storage_local.saved_bookmarks as BookmarkDataType[])
        : new Array<BookmarkDataType>();
    const index = saved_bookmarks.findIndex(
        (bookmark) => bookmark.id === bookmark_id
    );
    if (index === -1) return;
    saved_bookmarks.splice(index, 1);
    await StorageLocalSet({ saved_bookmarks: saved_bookmarks });
}

async function getAllSavedBookmarks() {
    const storage_local = await StorageLocalGet(["saved_bookmarks"]);
    const saved_bookmarks = storage_local.saved_bookmarks
        ? (storage_local.saved_bookmarks as BookmarkDataType[])
        : new Array<BookmarkDataType>();
    return saved_bookmarks;
}

//chrome.storage.local.getのprivateなラッパー関数
function StorageLocalGet(keys: string[]) {
    return new Promise<{ [key: string]: any }>((resolve) => {
        chrome.storage.local.get(keys, (result) => {
            resolve(result);
        });
    });
}
//chrome.storage.local.setのprivateなラッパー関数
function StorageLocalSet(items: any) {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set(items, () => {
            resolve();
        });
    });
}

export {
    pushToProcessQueue,
    popFromProcessQueue,
    addToSavedBookmarks,
    deleteFromSavedBookmarks,
    getAllSavedBookmarks,
};
