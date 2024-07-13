import { Router } from 'express';
import {
    createFeedback,
    getFeedback,
    getFeedbackDetail,
} from './feedback.controller.js';
import payloadParser from '../../utils/payload-parser.js';

const feedbackRoute = Router();

feedbackRoute.post('/', payloadParser, createFeedback);
feedbackRoute.get('/', getFeedback);
feedbackRoute.get('/:id', getFeedbackDetail);

export { feedbackRoute };
