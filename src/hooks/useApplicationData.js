import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = function (id, interview) {
    console.log("ID AND INTERVIEW", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(function(response) {
      setState({
        ...state,
        appointments
      });
  
    })
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: {student: null, interviewer: null}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(function(response) {
      setState({
        ...state,
        appointments
      });
    })

  }
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log("all[0}", all[0]); // first
      console.log("all[1]", all[1]); // second
      console.log("all[2]", all[2].data); // third

      const [first, second, third] = all;

      console.log("first, second, third", first, second, third);
    });
  }, []);


return { state, setDay, bookInterview, cancelInterview }
}