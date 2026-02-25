//payload for create meeting 
export interface CreateMeetingDto {
  userId: number;
  title: string;
  startTime: string;
  endTime: string;
}

//payload for update the meeting
export interface UpdateMeetingDto {
  title?: string;
  startTime?: string;
  endTime?: string;
}