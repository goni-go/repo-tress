import { Folder, FolderMetadata } from "../types/repo-content";
import { ContentType, GitHubContent } from "../types/github";
import { fetchFolderContent } from "../clients/github";
import { getFolderName, getFolderContent } from "./folder-handler";

class RepoTreeBuilder {

    private owner: string;
    private repository: string;

    constructor(owner: string, repository: string) {
        this.owner = owner;
        this.repository = repository;
    }

    public async buildTree(): Promise<Folder> {
        const tree = await this.buildTreeRec("");
        return tree;
    }

    private buildTreeRec(folderPath: string): Promise<Folder> {
        return new Promise(async (resolve, reject) => {
            let metadata: FolderMetadata;
            try {
                const githubContents = await fetchFolderContent(this.owner, this.repository, folderPath);
                metadata = this.getFolderMetadata(githubContents);
            } catch (error) {
                return reject(error);
            }

            const isMainDir = folderPath === "";
            const folderName = isMainDir ? this.repository : folderPath.split("/").slice(-1)[0];
            const { files, nestedFoldersPaths } = metadata;

            const isFolderHasOnlyFiles = files.length > 0 && nestedFoldersPaths.length === 0;
            if (isFolderHasOnlyFiles) {
                const folder: Folder = { [folderName]: files };
                return resolve(folder);
            }
            
            const promises = nestedFoldersPaths.map(path => this.buildTreeRec(path));
            try {
                const nestedFolders = await Promise.all(promises);
                const folder = this.buildFolder(folderName, nestedFolders, metadata);
                return resolve(folder);
            } catch (error) {
                return reject(error);
            }
        });
    }

    private getFolderMetadata(contents: GitHubContent[]): FolderMetadata {
        const files: string[] = [];
        const nestedFoldersPaths: string[] = [];

        for (const content of contents) {
            if (content.type === ContentType.FILE) {
                files.push(content.name);
            } else if (content.type === ContentType.DIR) {
                nestedFoldersPaths.push(content.path);
            }
        }

        return { files, nestedFoldersPaths };
    }
    
    private buildFolder(folderName: string, nestedFolders: Folder[], metadata: FolderMetadata): Folder {
        let folder: Folder;
        const { files, nestedFoldersPaths } = metadata;

        const isFolderHasOnlySingleNestedFolder = nestedFoldersPaths.length === 1 && files.length === 0;
        if (isFolderHasOnlySingleNestedFolder) {
            const nestedFolderName = getFolderName(nestedFolders[0]);
            const updatedFolderName = `${folderName}/${nestedFolderName}`;
            folder = { [updatedFolderName]: getFolderContent(nestedFolders[0], nestedFolderName) };
        } else {
            folder = { [folderName]: [...nestedFolders, ...files] };
        }

        return folder;
    }
}

export default RepoTreeBuilder;