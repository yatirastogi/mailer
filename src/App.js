
import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mailSent: false, //true if create acc is succesfull
      password: "",
      username: "", //logged user's name
      logged_email:"",//logged email id used to send email from this mail
      logged_password:"",//logged password
      mail: 0,
      create: "hide_create",
      login: "hide_login",
      login_message: "",
      create_message: "",
      list: [], //to store email address jinko mail karna
      a: "",
      b: "",
      c:"",
      mail_sent: 0, //1 if sending mail is successful
      mail_msg: "",
      send: "hide_send",
      messageToSend:"",
      num:0
    };
  }

  onSubmit(event) {
    //when user clicks login button
    this.onSubmit = this.onSubmit.bind(this);
    event.preventDefault();
    console.log(this.state);
    axios({
      method: "post",
      url: "http://localhost/bb/ok.php",
      headers: {
        "content-type": "application/json",
      },
      data: this.state,
    })
      .then((result) => {
        this.setState({
          username: result.data.user_name,
          login_message: result.data.mess,
          logged_email:this.state.email,
          logged_password:this.state.password,
          email: "",
          password: "",         
        });
        console.log(result.data.user_name);
        console.log(this.state);
      })
      .catch((error) =>
        this.setState({
          error: error.message,
        })
      );
  }
  onSubmit_c(event) {
    //when user creates acc
    this.onSubmit_c = this.onSubmit_c.bind(this);
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost/bb/create.php",
      headers: {
        "content-type": "application/json",
      },
      data: this.state,
    })
      .then((result) => {
        this.setState({
          mailSent: result.data.sent, //contains 1 if acc is created
          create_message: result.data.create_mess,
          name_c: "",
          email_c: "",
          password_c: "",
        });
      })
      .catch((error) =>
        this.setState({
          error: error.message,
        })
      );
  }
  showCreate(e) {
    this.hide_l(e);
    if (this.state.create === "hide_create") {
      e.target.className = "nav-link active";
      this.setState({ create: "show_create",send:"hide_send", email: "", password: "" });
      console.log("create visible");
      console.log(e.target.className);
      e.target.parentElement.parentElement.children[2].children[0].className="nav-link";
    } else {
      e.target.className = "nav-link";
      this.setState({ create: "hide_create" });
      console.log("create hidden");
    }
  }

  showSend(e) {
    if (this.state.send === "hide_send") {
      e.target.className = "nav-link active";
      this.setState({ send: "show_send",create:"hide_create",login:"hide_login", email: "", password: "" });
      console.log("send visible");
      e.target.parentElement.parentElement.children[0].children[0].className="nav-link";
      e.target.parentElement.parentElement.children[1].children[0].className="nav-link";
      console.log(e.target.parentElement.parentElement.children[0].children[0].className)
    } else {
      e.target.className = "nav-link";
      this.setState({ send: "hide_send" });
      console.log("send hidden");
     
    }
  }

  showLogin(e) {
    this.hide(e);

    if (this.state.login === "hide_login") {
      e.target.className = "nav-link active";
      this.setState({
        login: "show_login",
        name: "",
        email: "",
        password: "",
        mailSent: false,
        send:"hide_send"
      });
      console.log("login visible");
     // e.target.parentElement.parentElement.children[0].children[0].className="nav-link";
      e.target.parentElement.parentElement.children[2].children[0].className="nav-link";
      console.log(e.target.parentElement.parentElement.children)
    } else {
      e.target.className = "nav-link";
      this.setState({ login: "hide_login" });
      console.log("log hidden");
    }
  }
  hide(e) {
    this.setState({ create: "hide_create" });
    //e.target.parentElement.previousSibling.className="nav-link";
    e.target.parentElement.previousElementSibling.childNodes[0].className =
      "nav-link";
  }
  hide_l(e) {
    this.setState({ login: "hide_login" });
    //e.target.parentElement.previousSibling.className="nav-link";
    e.target.parentElement.nextElementSibling.childNodes[0].className =
      "nav-link";
  }
  
  onSend_try(event) {
    event.preventDefault();
    var s = [];
    //to send mails
    this.onSend_try = this.onSend_try.bind(this);
    let i = 0;
    const len = event.target.parentElement.children[1].children.length;
    let k = 0;
    for (i = 0; i < (len-1); i++) {
       if (event.target.parentElement.children[1].children[i].children[1].value !== "") {
          s[i] = event.target.parentElement.children[1].children[i].children[1].value;
          k = k + 1;
      } else continue;
      }
    //console.log(s);
    this.setState({ list: s ,num:k});

    console.log(this.state);
    axios({
      method: "post",
      url: "http://localhost/mail.php",
      headers: {
        "content-type": "application/json",
      },
      data: this.state,
    })
      .then((result) => {
        this.setState({
          mail_sent: result.data.mail_sent,
          mail_msg: result.data.mail_msg,
        });
        if(this.state.mail_sent){
          this.setState({a:"",b:"",c:"",messageToSend:""})
        }
        console.log(result.data);
        //console.log(this.state);
      })
      .catch((error) =>
        this.setState({
          error: error.message,
        })
      );
  }
  render() {
    return (
      <div className="container">
        <ul style={{marginBottom:"10%"}} className="nav nav-pills">
          <li className="nav-item">
            <button onClick={(e) => this.showCreate(e)} className="nav-link">
              Create
            </button>
          </li>
          <li className="nav-item">
            <button onClick={(e) => this.showLogin(e)} className="nav-link">
              Login
            </button>
          </li>
          <li className="nav-item">
            <button onClick={(e) => this.showSend(e)} className="nav-link">
              Send Mail
            </button>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              {this.state.username}
            </button>
          </li>
        </ul>

        <div className={this.state.create}>
          <h1>Create Account</h1>

          <div className="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={this.state.name_c}
              onChange={(e) => this.setState({ name_c: e.target.value })}
              class="form-control"
              id="name_c"
            ></input>
          </div>
          <div class="form-group">
            <label for="name">Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={this.state.email_c}
              onChange={(e) => this.setState({ email_c: e.target.value })}
              class="form-control"
              id="email_c"
            ></input>
          </div>
          <div class="form-group">
            <label for="name">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={this.state.password_c}
              onChange={(e) => this.setState({ password_c: e.target.value })}
              class="form-control"
              id="password_c"
            ></input>
          </div>

          <button
            style={{ marginBottom: "3%" }}
            className="btn btn-primary"
            value="create"
            onClick={(e) => this.onSubmit_c(e)}
          >
            Create
          </button>
          <br />
          <div>
            <p className="msg">{this.state.create_message}</p>
          </div>
        </div>

        <div className={this.state.login}>
          <h1>FORM login</h1>

          <div className="form-group">
            <label for="name">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              className="form-control"
              id="email"
            ></input>
          </div>
          <div className="form-group">
            <label for="name">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control"
              id="password"
            ></input>
          </div>
         

          <button
            style={{ marginBottom: "4%" }}
            className="btn btn-primary"
            value="Login"
            onClick={(e) => this.onSubmit(e)}
          >
            Login
          </button>
          <br />

          <div>
            <p className="msg">{this.state.login_message}</p>
          </div>
          </div>

          <div className={this.state.send}>
            <h1>Send Mail</h1>
            <div className="outer">
            <div className="form-group">
            <label for="name">Email 1:</label>
                <input
                  value={this.state.a}
                  onChange={(e) => this.setState({ a: e.target.value })}
                  type="text"
                ></input>
                </div>
                <div className="form-group">
                <label for="name">Email 2:</label>
                <input
                  value={this.state.b}
                  onChange={(e) => this.setState({ b: e.target.value })}
                  type="text"
                ></input>
                </div>
                <div className="form-group">
                <label for="name">Email 3:</label>
                <input value={this.state.c}
                  onChange={(e) => this.setState({ c: e.target.value })} type="text"></input>
              </div>
              <div className="form-group">
            <label for="message">Enter Message to Send:</label>
            <input
              type="text"
              placeholder="Enter your message"
              value={this.state.messageToSend}
              onChange={(e) => this.setState({ messageToSend: e.target.value })}
              className="form-control"
              id="message"
            ></input>
          </div>
              </div>
              <button
                className="btn btn-primary"
                value="Send"
                onClick={(e) => this.onSend_try(e)}
              >
                Send
              </button>
              {this.state.mail_sent ? (
            <p className="msg">
              Mail succesfully sent
              <br />
              <br />
            </p>
          ) : (
            <p></p>
          )}
         
        </div>
        <div className=" box feedback-form">
          {this.state.sent ? (
            <p className="msg">
              Mail succesfully sent to {this.state.name}
              <br />
              <br />
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
