import React from "react";
import config from "./../../config";
import Form from "./Form";
import Cookies from "js-cookie";

// This component provides the "Update Course" screen by rendering a form
// that allows a user to update one of their existing courses. The component
// also renders an "Update Course" button that when clicked sends a PUT
// request to the REST API's /api/courses/:id route. This component also
// renders a "Cancel" button that returns the user to the "Course Detail" screen.

export default class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      userId: this.props.context.authenticatedUser.userId,
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      emailAddress: "",
      firstName: "",
      lastName: "",
      errors: []
    };
  }

  componentDidMount() {
    this.getCourse();
    console.log(config.apiBaseUrl);
  }

  async getCourse() {
    await fetch(
      config.apiBaseUrl + "/courses/" + this.props.match.params.id
    ).then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          this.setState({
            //course: data,
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            emailAddress: data.owner.emailAddress,
            firstName: data.owner.firstName,
            lastName: data.owner.lastName
          });
        });
      } else if (res.status === 401) {
        return null;
      } else {
        new Error();
      }
    });
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    fetch(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(this.state.emailAddress + ":" + Cookies.get("password"))
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        // console.log(res.status); //=> number 100–599
        // console.log(res.statusText); //=> String
        // console.log(res.headers); //=> Headers
        // console.log(res.url); //=> String
        // console.log(res.text);
        this.props.history.push("/");
      })
      .catch(errors => {
        if (errors.length) {
          this.setState({ errors });
          this.props.history.push("/error");
        }
      });
  };

  cancel = () => {
    this.props.history.push("/"); // redirect to main page
  };

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        className="input-title course--title--input"
                        id="title"
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.change}
                        placeholder="Title"
                      />
                      <p>
                        By {this.state.firstName} {this.state.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="textarea"
                        value={this.state.description}
                        onChange={this.change}
                        placeholder="Course description..."
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={this.state.estimatedTime}
                            onChange={this.change}
                            placeholder="Hours"
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            type="textarea"
                            value={this.state.materialsNeeded}
                            onChange={this.change}
                            placeholder="Materials"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
}
