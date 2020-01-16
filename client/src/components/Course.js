import React, { Component } from "react";

class Course extends Component {
  state = {
    contacts: []
  };
  render() {
    return (
      <div class="grid-33">
        <a class="course--module course--link" href="course-detail.html">
          <h4 class="course--label">Course</h4>
          <h3 class="course--title">Build a Basic Bookcase</h3>
        </a>
      </div>
    );
  }
}

export default Course;
