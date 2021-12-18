import axios from "axios";
import env from "../config/env";
import { GitHubContent } from "../types/github";

const githubApiUrl = "https://api.github.com";
const config = { 
    headers: { 
        Accept: "application/vnd.github.v3+json" 
    },
    auth: {
        username: env.CLIENT_ID,
        password: env.SECRET_KEY
    }
};

export const fetchFolderContent = async (owner: string, repo: string, pathToFolder: string): Promise<GitHubContent[]> => {
    const url = `${githubApiUrl}/repos/${owner}/${repo}/contents/${pathToFolder}`;
    const { data: contents } = await axios.get(url, config);
    return contents as GitHubContent[];
};

export const getRepoId = async (owner: string, repo: string): Promise<string> => {
    const url = `${githubApiUrl}/repos/${owner}/${repo}`;
    const { data } = await axios.get(url, config);
    return data.id;
};