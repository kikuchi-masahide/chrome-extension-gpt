import { OpenAIApi, Configuration, CreateEmbeddingRequest } from "openai";
import { StorageSyncGet } from "./utils/storage_sync";
import { OpenaiEmbedingsResponseType } from "./types/openai_embeddings_response_type";

async function embed(text: string) {
    console.log("embed start");
    const url = "https://api.openai.com/v1/embeddings";
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${await get_openai_api_key()}`);
    const body = {
        input: text,
        model: "text-embedding-ada-002",
    };
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    const json = (await response.json()) as OpenaiEmbedingsResponseType;
    console.log(json);
    console.log("embed end");
    return json.data[0].embedding;
}

async function get_openai_api_key() {
    const storage_get = await StorageSyncGet(["openai_api_key"]);
    return storage_get["openai_api_key"] as string;
}

export { embed };
