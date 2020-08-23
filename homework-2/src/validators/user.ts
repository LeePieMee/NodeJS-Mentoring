import Joi from 'joi';
import express from 'express';

// ToDo use keys
const createSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
});

const updateSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
});

const schemaValidation = (schema: Joi.ObjectSchema, hasId?: boolean): express.RequestHandler => (req, res, next) => {
    const data = hasId ? {...req.body, id: req.params.id} : req.body;
    const {error} = schema.validate(data);

    if (error) {
        const {details} = error;
        const message = details.map((i) => i.message).join(',');

        res.status(400).json({error: message});
    } else {
        next();
    }
};

export const updateUserValidation = schemaValidation(updateSchema, true);

export const createUserValidation = schemaValidation(createSchema);
