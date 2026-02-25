import { Router } from 'express';
import { registerUser, listUsers } from '../modules/meeting/index/controllers/user.controller';
import { 
  scheduleMeeting, 
  listMeetings, 
  getMeeting, 
  editMeeting, 
  removeMeeting 
} from '../modules/meeting/index/controllers/meeting.controller';

const router = Router();

// User Routes
router.post('/users', registerUser);
router.get('/users', listUsers); 

// Meeting Routes
router.post('/meetings', scheduleMeeting);
router.get('/meetings', listMeetings);
router.get('/meetings/:id', getMeeting);
router.put('/meetings/:id', editMeeting);
router.delete('/meetings/:id', removeMeeting); 

export default router;