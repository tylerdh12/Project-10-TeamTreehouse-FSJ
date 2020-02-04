import * as React from "react";
import config from "../../config";
import withContext from "./../../Context";

// This component provides the "Course Detail" screen by retrieving the detail
// for a course from the REST API's /api/courses/:id route and rendering the course.
// The component also renders a "Delete Course" button that when clicked should send a
// DELETE request to the REST API's /api/courses/:id route in order to delete a course.
// This component also renders an "Update Course" button for navigating to the
// "Update Course" screen.

// Import Actions--Bar Component
import ActionsBar from "./ActionsBar";
import Details from "./Details";

//Adds context for Auth User to make dynamic buttons for Action Bar
const ActionsBarWithContext = withContext(ActionsBar);

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      courseId: null,
      course: [],
      owner: [],
      materialsNeeded: [],
      errors: []
    };
  }

  componentDidMount() {
    this.getCourse();
  }

  async getCourse() {
    let courseIdParen = await this.props.location.pathname;
    let courseId = await courseIdParen.replace("/courses/", "");
    this.setState({
      courseId: courseId
    });

    await fetch(config.apiBaseUrl + "/courses/" + this.state.courseId)
      .then(res => {
        if (res.status === 500) {
          this.props.history.push("/error");
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data === null) {
          this.props.history.push("/notfound");
        } else {
          this.setState({
            course: data,
            owner: data.owner
          });
        }
      });
  }

  render() {
    return (
      <div>
        <ActionsBarWithContext
          courseId={this.state.courseId}
          ownerId={this.state.owner.id}
        />
        <Details
          course={this.state.course}
          owner={this.state.owner}
          key={this.state.course.id}
        />
      </div>
    );
  }
}

export default CourseDetail;