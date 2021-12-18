import { Request, Response, NextFunction } from "express";

export const validateHeaders = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { owner_name, repository } = req.headers;
    const missingFields = [];
    if (!owner_name) { missingFields.push("owner_name"); }
    if (!repository) { missingFields.push("repository"); }
    
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `The reuired fields are missing: ${missingFields}` });
    }
    return next();
};