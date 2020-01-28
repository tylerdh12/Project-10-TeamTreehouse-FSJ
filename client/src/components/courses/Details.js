import React from "react";
import ReactMarkdown from "react-markdown";

export default class Details extends React.Component {
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.props.course;
    const { firstName, lastName } = this.props.owner;

    return (
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{title}</h3>
            <p>
              By {firstName} {lastName}
            </p>
          </div>
          <div className="course--description">
            <ReactMarkdown source={description} />
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  <ReactMarkdown source={materialsNeeded} />
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
