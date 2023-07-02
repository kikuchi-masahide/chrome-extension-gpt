function StorageSyncGet(keys: string[]) {
    return new Promise<{ [key: string]: any }>((resolve) => {
        chrome.storage.sync.get(keys, (result) => {
            console.log(result);
            resolve(result);
        });
    });
}

function StorageSyncSet(items: any) {
    return new Promise<void>((resolve) => {
        chrome.storage.sync.set(items, () => {
            resolve();
        });
    });
}

export { StorageSyncGet, StorageSyncSet };