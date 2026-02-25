import { Op } from 'sequelize';
import Meeting from '../module/meeting.model';
import { CreateMeetingDto } from '../dto/meeting.dto';

// condtions for creating the meeting
export const createMeeting = async (meetingData: CreateMeetingDto) => {

  //checking the time conflicts
  const conflictingMeeting = await Meeting.findOne({
    where: {
      userId: meetingData.userId, 
      startTime: {
        [Op.lt]: new Date(meetingData.endTime), // existing.start < new.end
      },
      endTime: {
        [Op.gt]: new Date(meetingData.startTime), // existing.end > new.start
      },
    },
  });

  // if conflict found
  if (conflictingMeeting) {
    throw new Error('Time slot already booked');
  }

  // create meeting with no conflicts
  const newMeeting = await Meeting.create({
    userId: meetingData.userId,
    title: meetingData.title,
    startTime: new Date(meetingData.startTime),
    endTime: new Date(meetingData.endTime),
  });

  return newMeeting;
};

// to get all the meeting
export const getAllMeetings = async (filters: any) => {
  const whereClause: any = {};

  if (filters.userId) {
    whereClause.userId = filters.userId;
  }

  if (filters.startDate && filters.endDate) {
    whereClause.startTime = {
      [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
    };
  }

  return await Meeting.findAll({ where: whereClause });
};

export const getMeetingById = async (id: number) => {
  return await Meeting.findByPk(id); // finds the primary key
};

// conditions to update the meeting
export const updateMeeting = async (id: number, updateData: any) => {
  
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw new Error('Meeting not found');
  }

  // check the conflicts again
  if (updateData.startTime && updateData.endTime) {
    const conflictingMeeting = await Meeting.findOne({
      where: {
        userId: meeting.userId,
        id: { [Op.ne]: id },
        startTime: {
          [Op.lt]: new Date(updateData.endTime), // existing.start < new.end
        },
        endTime: {
          [Op.gt]: new Date(updateData.startTime), // existing.end > new.start
        },
      },
    });

    if (conflictingMeeting) {
      throw new Error('Time slot already booked'); 
    }
    
    // Update if no conflic is found
    meeting.startTime = new Date(updateData.startTime);
    meeting.endTime = new Date(updateData.endTime);
  }

  if (updateData.title) {
    meeting.title = updateData.title;
  }

  await meeting.save(); //save the change in the database
  return meeting;
};

export const deleteMeeting = async (id: number) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw new Error('Meeting not found');
  }

  await meeting.destroy(); 
  return true;
};