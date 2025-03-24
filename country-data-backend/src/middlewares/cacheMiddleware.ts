import NodeCache from "node-cache";
import { NextFunction, Request, Response } from "express";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    if (cachedData) {
      console.log("Serving from cache:", key);
      res.json(cachedData);
      return; 
    }

    console.log("Cache miss:", key);

    const sendResponse = res.json.bind(res);

    res.json = (body: any) => {
      cache.set(key, body);
      return sendResponse(body);
    };

    next(); 
  } catch (error) {
    console.error("Cache middleware error:", error);
    next(error);
  }
};

export const clearCache = (req: Request, res: Response, next: NextFunction): void => {
  try {
    cache.flushAll();
    console.log("Cache cleared");
    res.json({ message: "Cache cleared" });
  } catch (error) {
    console.error("Error clearing cache:", error);
    next(error);
  }
};
