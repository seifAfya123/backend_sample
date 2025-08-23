import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validationErrorMessage = (error: Joi.ValidationError) => {
  return error.details.map((d) => {
    if (d.type === 'any.required') {
      return `${d.path.join('.')} is required`  ;
    } else if (d.type === 'string.empty') {
      return `${d.path.join('.')} cannot be empty`;
    } else if (d.type === 'string.min') {
      return `${d.path.join('.')} must be at least ${d.context?.limit} characters long`;
    } else if (d.type === 'string.max') {
      return `${d.path.join('.')} must be at most ${d.context?.limit} characters long`;
    } else if (d.type === 'string.email') {
      return `${d.path.join('.')} must be a valid email address`;
    } else {
      return d.message;
    }
  });
};

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true, 
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        error: validationErrorMessage(error)[0],
      });
    }

    req.body = value;
    next();
  };
};
