/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, {
      interview,
    })
      .then((response) => {
        setState({
          ...state,
          days: updateSpots(appointments),
          appointments,
        });
      });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({
          ...state,
          days: updateSpots(appointments),
          appointments,
        });
      });
  };

  const updateSpots = function (appointments) {
    const findSpots = state.days.map((day) => {
      if (day.name === state.day) {
        const appointmentsForDay = day.appointments.map((appointment) => appointments[appointment]);
        const count = appointmentsForDay.filter((appointment) => appointment.interview === null).length;

        return { ...day, spots: count };
      }

      return day;
    });

    return findSpots;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data,
      }));

      const [first, second, third] = all;
    });
  }, []);

  return {
    state, setDay, bookInterview, cancelInterview,
  };
}
