import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// Transition variables //
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
 const { interview, interviewers, time, bookInterview, id, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY,
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

  
      bookInterview(id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => {
        error_save();
      });
  }

  function edit() {
    transition(EDIT);
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function error_save() {
    transition(ERROR_SAVE, true);
  }

  function error_delete() {
    transition(ERROR_DELETE, true);
  }

  function cancelInterviewAndDelete() {
    transition(DELETING, true);

    cancelInterview(id)
      .then((response) => {
        transition(EMPTY);
      })
      .catch((error) => {
        error_delete();
      });
  }

  return (
    <article className="appointment">
      <Header
        time={time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          student={interview.student}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === SAVING && (
        <Status
          message={SAVING}
        />
      )}
      {mode === DELETING && (
        <Status
          message={DELETING}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={cancelInterviewAndDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Oops! Something went wrong and the appointment could not be saved"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Oops! Something went wrong and the appointment could not be deleted"
          onClose={back}
        />
      )}
    </article>
  );
}
