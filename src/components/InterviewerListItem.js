import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  const interviewImageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  });

  return (

    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className={interviewImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );
}