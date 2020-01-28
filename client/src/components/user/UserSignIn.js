import React from "react";
import Form from "./Form";

// This component provides the "Course Detail" screen by retrieving the detail for a
// course from the REST API's /api/courses/:id route and rendering the course.
// The component also renders a "Delete Course" button that when clicked should send
// a DELETE request to the REST API's /api/courses/:id route in order to delete a course.
// This component also renders an "Update Course" button for navigating to the
// "Update Course" screen.

export default class UserSignIn extends React.Component {
  state = {
    emailAddress: "",
    password: "",
    errors: []
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <a href="signup">Click here</a> to sign
            up!
          </p>
        </div>
      </div>
    );
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
    const { context } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "authenticated" }
    };
    const { emailAddress, password } = this.state;

    context.actions
      .signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/"); // redirect to main page
  };
}
