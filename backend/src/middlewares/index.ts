import express from 'express';
import morgan from 'morgan';

export const middleware = [express.json, () => morgan('dev')];
