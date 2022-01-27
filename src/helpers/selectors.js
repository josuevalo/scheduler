export function getAppointmentsForDay(state, day) {

  const findDay = state.days.find(dayObj => dayObj.name === day);

  if (!findDay) {
    return []
  }

  const arrayOfAppointments = findDay.appointments.map(appointment => state.appointments[appointment])

  return arrayOfAppointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const idForInterviewer = interview.interviewer;

  const interviewerObj = state.interviewers[idForInterviewer]
  return {

    "student": interview.student,
    interviewer: interviewerObj
  }
}

export function getInterviewersForDay(state, day) {

  const findDay = state.days.find(dayObj => dayObj.name === day);

  if (!findDay) {
    return []
  }

  const arrayOfInterviewers = findDay.interviewers.map(interviewer => state.interviewers[interviewer])

  return arrayOfInterviewers;
}