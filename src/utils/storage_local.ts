function StorageLocalGet(keys: string[]) {
    return new Promise<{ [key: string]: any }>((resolve) => {
        chrome.storage.local.get(keys, (result) => {
            resolve(result);
        });
    });
}

function StorageLocalSet(items: any) {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set(items, () => {
            resolve();
        });
    });
}

export { StorageLocalGet, StorageLocalSet };
