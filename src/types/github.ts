export enum ContentType {
    FILE = "file",
    DIR = "dir"
    // TODO symlink & submodule
}

export type GitHubContent = {
    type: ContentType;
    name: string;
    path: string;
}