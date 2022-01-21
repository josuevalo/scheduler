export function getAppointmentsForDay(state, day) {

  const findDay = state.days.find(dayObj => dayObj.name === day);

  if (!findDay) {
    return []
  }

  const arrayOfAppointments = findDay.appointments.map(appointment => state.appointments[appointment])

  return arrayOfAppointments;
}
