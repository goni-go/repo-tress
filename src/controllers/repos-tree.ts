import { Request, Response } from "express";
import logger from "../helpers/logger";
import RepoTreeBuilder from "../helpers/tree-builder";

export const createRepoTreeController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { owner_name, repository } = req.headers;
        const treeBuilder = new RepoTreeBuilder(owner_name as string, repository as string);
        const tree = await treeBuilder.buildTree();
        logger.info(`The Hierarchy Tree For Repository '${repository}': ${JSON.stringify(tree[repository as string])}`);
        return res.status(200).json(tree);
    } catch (error) {
        logger.error(`Error occured: ${error}`);
        return handleErrors(error, res);
    }
};

const handleErrors = (error: any, res: Response): Response => {
    if (error.isAxiosError) {
        const { response } = error;
        return res.status(response.status).json({ message: response.data.message });
    }
    return res.status(500).json({ message: "Something wen't wrong" });
};