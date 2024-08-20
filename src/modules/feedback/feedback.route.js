import { Router } from 'express';
import {
    createFeedback,
    getFeedback,
    getFeedbackDetail,
    likeFeedback,
    getFeedbackById,
} from './feedback.controller.js';
import payloadParser from '../../utils/payload-parser.js';

const feedbackRoute = Router();

feedbackRoute.post('/', payloadParser, createFeedback);
feedbackRoute.get('/', getFeedback);
feedbackRoute.get('/:id', getFeedbackDetail);
feedbackRoute.post('/:id', likeFeedback);
feedbackRoute.get('/:id', getFeedbackById);

export { feedbackRoute };
