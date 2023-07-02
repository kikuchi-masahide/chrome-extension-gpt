import { BookmarkProcess, BookmarkProcessRegistered, BookmarkProccessDeleted } from "./types/bookmark_process_type";
import { StorageLocalGet, StorageLocalSet } from "./utils/storage_local";

export default async function backgroundStorageOnChanged(changes: {
    [key: string]: chrome.storage.StorageChange,
}, namespace: 'sync' | 'local' | 'managed') {
    if (namespace === 'local') {
        onLocalChanged();
    }
}

async function onLocalChanged() {
    const storage_local = await StorageLocalGet(['process_queue']);
    if (storage_local.process_queue === undefined) return;
    const process_queue = storage_local.process_queue as BookmarkProcess[];
    //先頭のみ取り出し削除
    if (process_queue.length === 0) return;
    if (process_queue[0].stage === 'REGISTERED') {
        const process = process_queue[0] as BookmarkProcessRegistered;
        console.log('process_queue[0] is REGISTERED');
        console.log(process);
    }
    else if (process_queue[0].stage === 'DELETED') {
        const process = process_queue[0] as BookmarkProccessDeleted;
        console.log('process_queue[0] is DELETED');
        console.log(process);
    }
    process_queue.shift();
    await StorageLocalSet({ process_queue });
}