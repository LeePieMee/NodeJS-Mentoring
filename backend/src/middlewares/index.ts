import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {checkAuthenticate} from './checkAuthenticate';

export const middleware = [express.json, () => morgan('dev'), () => checkAuthenticate, cors];
