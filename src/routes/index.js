import express from 'express';
import { indexPage, messagesPage, addMessage } from '../controllers';
import { modifyMessage } from '../middleware';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, addMessage);

indexRouter.post('/rules');
export default indexRouter;
