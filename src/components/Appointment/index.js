import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props
      .bookInterview(props.id, interview)
      .then(function (response) {
        console.log(response);
        transition(SHOW)
      })
      .catch(function (error) {
        console.log("BookInterview", error);
        error_save()
      });
  }

  function edit() {
    transition(EDIT)
  }

  function confirmDelete() {
    transition(CONFIRM)
  }

  function error_save() {
    transition(ERROR_SAVE, true)
  }

  function error_delete() {
    transition(ERROR_DELETE, true)
  }

  function cancelInterviewAndDelete() {

    transition(DELETING)

    props.cancelInterview(props.id)
      .then(function (response) {
        console.log(response);
        transition(EMPTY)
      })
      .catch(function (error) {
        console.log("cancelInterview", error);
        error_delete()
      });
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
          message={"Are you sure you would like to delete?"}
          onConfirm={cancelInterviewAndDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Oops! Something went wrong"}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Oops! Something went wrong"}
          onClose={back}
        />
      )}
    </article>
  )
}

