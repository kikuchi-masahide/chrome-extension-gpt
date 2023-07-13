type OpenaiEmbedingsRequestTypeInnerData = {
    embedding: number[];
};

type OpenaiEmbedingsResponseType = {
    data: OpenaiEmbedingsRequestTypeInnerData[];
};

export { OpenaiEmbedingsResponseType };
