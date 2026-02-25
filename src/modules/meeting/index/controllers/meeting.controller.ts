import { Request, Response } from 'express';
import * as meetingService from '../../service/meeting.service';
import { CreateMeetingDto } from '../../dto/meeting.dto';

export const scheduleMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetingData: CreateMeetingDto = req.body;

    //checking the payload
    if (!meetingData.userId || !meetingData.title || !meetingData.startTime || !meetingData.endTime) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const start = new Date(meetingData.startTime);
    const end = new Date(meetingData.endTime);

    if (start >= end) {
      res.status(400).json({ error: 'Start time must be before end time' });
      return;
    }

    const newMeeting = await meetingService.createMeeting(meetingData);
    
    res.status(201).json({ message: 'Meeting scheduled successfully', meeting: newMeeting });

  } catch (error: any) {

    if (error.message === 'Time slot already booked') {
      res.status(400).json({ error: 'Time slot already booked' });
    } else {
      res.status(500).json({ error: 'Failed to schedule meeting', details: error.message });
    }
  }
};

// Add to the bottom of src/modules/meeting/index/meeting.controller.ts

export const listMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters like ?userId=1&startDate=...
    const filters = {
      userId: req.query.userId,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const meetings = await meetingService.getAllMeetings(filters);
    res.status(200).json(meetings);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch meetings', details: error.message });
  }
};

export const getMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetingId = parseInt(req.params.id as string);
    const meeting = await meetingService.getMeetingById(meetingId);
    
    if (!meeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }
    
    res.status(200).json(meeting);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch meeting', details: error.message });
  }
};

// Add to the bottom of src/modules/meeting/index/meeting.controller.ts

export const editMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetingId = parseInt(req.params.id as string);
    const updateData = req.body;

    // Basic validation if they are trying to update time
    if (updateData.startTime && updateData.endTime) {
      const start = new Date(updateData.startTime);
      const end = new Date(updateData.endTime);
      if (start >= end) {
        res.status(400).json({ error: 'Start time must be before end time' });
        return;
      }
    }

    const updatedMeeting = await meetingService.updateMeeting(meetingId, updateData);
    res.status(200).json({ message: 'Meeting updated successfully', meeting: updatedMeeting });

  } catch (error: any) {
    if (error.message === 'Meeting not found') {
      res.status(404).json({ error: error.message });
    } else if (error.message === 'Time slot already booked') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update meeting', details: error.message });
    }
  }
};

export const removeMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetingId = parseInt(req.params.id as string);
    await meetingService.deleteMeeting(meetingId);
    
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Meeting not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to delete meeting', details: error.message });
    }
  }
};