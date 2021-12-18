import { Folder, Content } from "../types/repo-content";

export const getFolderName = (folder: Folder): string => {
    return Object.keys(folder)[0];
};

export const getFolderContent = (folder: Folder, folderName: string): Content[] => {
    return folder[folderName];
};