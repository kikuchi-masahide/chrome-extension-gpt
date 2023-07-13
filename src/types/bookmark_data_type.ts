//ブックマークした各ページに対しlocalに保存するデータの型
type BookmarkDataType = {
    id: string;
    url: string;
    title: string;
    vector: number[];
};

export default BookmarkDataType;
