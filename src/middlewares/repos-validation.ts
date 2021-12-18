import { Request, Response, NextFunction } from "express";
import { getRepoId } from "../clients/github";

const NOT_FOUND_MSG = "The repository was not found";

export const validateRepoExitsence = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { owner_name, repository } = req.headers;
        const repoId = await getRepoId(owner_name as string, repository as string);
        if (!repoId) {
            return res.status(404).json({ message: NOT_FOUND_MSG });
        }
        return next();
    } catch (error) {
        return res.status(404).json({ message: NOT_FOUND_MSG });
    }
};