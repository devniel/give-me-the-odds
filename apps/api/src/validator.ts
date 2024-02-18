import { Request, Response, NextFunction } from 'express';
import { z } from "zod";

// Middleware for validating the request body against the Empire schema
export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: {
          message: "Invalid empire data",
          details: result.error.format()
        }
      });
    } else {
      next();
    }
  };
}