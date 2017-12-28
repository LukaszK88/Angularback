
export const mapAttendance = (attendance) => {
  return attendance.map((attend) => ({
    ...attend,
    id: attend.id,
    user_id: parseInt(attend.user_id),
    event_id: attend.event_id,
    event_attend_category: attend.event_attend_category,
    user: attend.user,
  }));
};