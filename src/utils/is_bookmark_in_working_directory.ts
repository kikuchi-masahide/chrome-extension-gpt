//指定されたBookmarkTreeNodeの親をたどり、「モバイルのブックマーク」の「chrome-extension-gpt」のフォルダに含まれるか否か判断
async function isBookmarkInWorkingDirectory(id: string) {
    const parents: chrome.bookmarks.BookmarkTreeNode[] = [
        (await chrome.bookmarks.get(id))[0],
    ];
    while (true) {
        const top = parents[parents.length - 1];
        const parent_id = top.parentId;
        if (parent_id === undefined) break;
        const parent = (await chrome.bookmarks.get(parent_id))[0];
        parents.push(parent);
    }
    if (parents.length < 3) return false;
    const root = parents[parents.length - 2];
    const root_ch = parents[parents.length - 3];
    return (
        root.title === "モバイルのブックマーク" &&
        root_ch.title === "chrome-extension-gpt"
    );
}

export default isBookmarkInWorkingDirectory;
