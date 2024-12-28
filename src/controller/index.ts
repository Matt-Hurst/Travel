import { Request as ERequest, NextFunction, Response } from 'express';
import Joi from 'joi';

type Category = "activity" | "misc" | "travel"


type Entry = {
 cost: number; 
 country: string; 
 category: Category; 
 description: string; 
}

interface Request extends ERequest { safeFields: object }

const postSchema = Joi.array().min(1).items(Joi.object({
    cost: Joi.number().precision(2),
    country: Joi.string(),
    category: Joi.string().valid("activity", "misc", "travel"),
    description: Joi.string(),
  }));

const validatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validPosts: Entry[] = await postSchema.validateAsync(req.body);
  
    req.safeFields = {
      ...req.safeFields,
      validPosts,
    }
    next();
  } catch (error) {
       next(error);
  }
};

const postEntries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).send('CREATED')
  } catch (error) {
    next(error);
  }
};

export default  { postEntries, validatePost };
