export type File = string;

export type Folder = {
    [name: string]: Content[];
}

export type Content = File | Folder;

export type FolderMetadata = {
    files: string[];
    nestedFoldersPaths: string[];
}