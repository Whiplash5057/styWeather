import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLogin } from '../actions';
import Modal from 'react-responsive-modal';
import * as firebase from 'firebase';
 // Initialize Firebase
 const config = {
  apiKey: "AIzaSyARxiYd9PqHTwcUal_e79S6fTJdfJUJ8j0",
  authDomain: "stylabsweather.firebaseapp.com",
  databaseURL: "https://stylabsweather.firebaseio.com",
  projectId: "stylabsweather",
  storageBucket: "stylabsweather.appspot.com",
  messagingSenderId: "633113148246"
};




class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      open: false,
      username: '',
      imageLink: '',
      message: '',
    };

    this.onSubmitLogin = this.onSubmitLogin.bind(this);
  }


  componentDidMount() {
    this.initiateCanvas();
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onSubmitLogin(provider) {
    // console.log('submited', provider);
    firebase.auth().signInWithPopup(provider)
        .then((result)=>{
          // console.log(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // console.log(result);
          this.setState({ 
            username: user.displayName,
            imageLink: user.photoURL,
            message: 'A place where you can have access to all the weather data important to you for the next 5 days in a clean and concise line graph.'
          });
          this.onOpenModal();

          let sendToActionCreator = {
            user,
            login: true,
            providerType: provider.providerId
          }

          this.props.setLogin(sendToActionCreator, () => {
              setTimeout(() => { 
                this.props.history.push('/getweather');
              }, 5000);
          });

        }).catch((error) => {
          // console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          this.setState({ 
            username: 'Oops... Something went wrong. Please try again',
            imageLink: "http://localhost:8080/error.png",
            message: error.message
           });
          this.onOpenModal();
        });
  }

  render() {

    const { open } = this.state;

    return (
      <div className="splashScreenContainer">
        <canvas className="splashScreenContainer__canvas"></canvas>
        <div className="splashScreenContainer__login loginForm">
          <div className="loginForm__largeLogoText">styWeather</div>
          <div className="loginForm__smallLogoText">Get a five-day forecast of your selected city</div>
          <div className="loginForm__loginBtns">
            <div 
              onClick={(this.onSubmitLogin.bind(this, new firebase.auth.GoogleAuthProvider()))} 
              className="loginBtn__google">
                +Google
              </div>
            <div onClick={(this.onSubmitLogin.bind(this, new firebase.auth.GithubAuthProvider()))} className="loginBtn__github">Github</div>
          </div>
        </div>

        <Modal open={open} onClose={this.onCloseModal} little >
                    
            <div className="dialogAlertText" >
                <img className="loginImg" src={this.state.imageLink} />
                <h2>Hello {this.state.username}</h2>
                <div className="leftAlignUls">Welcome to styWeather, <br/>
                  {this.state.message}
                </div>
                
            </div>
        </Modal>
        
      </div>
    );
  }

  initiateCanvas() {
    
    // Initial Setup
    const canvas = document.querySelector('.splashScreenContainer__canvas');
    const c = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;


    // Variables
    const mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2 
    };

    const colors = [
      '#000',
      '#000',
      '#000'
    ];


    // Event Listeners
    addEventListener('mousemove', event => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    addEventListener('resize', () => {
      canvas.width = innerWidth;	
      canvas.height = innerHeight;

      init();
    });


    // Utility Functions
    function randomIntFromRange(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    }


    // Objects
    function Particle(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.radians = Math.random() * Math.PI * 2;
      this.velocity = 0.009;


      //THIS IS FOR 3D EFFECT

      // this.distanceFromCenter = {
      // 	x: randomIntFromRange(50, 150),
      // 	y: randomIntFromRange(50, 150)
      // }

      this.distanceFromCenter = randomIntFromRange(350, 1050);
      this.lastMouse = {
        x: x,
        y: y
      }

      this.update = () => {
        const lastPoint = {
          x: this.x,
          y: this.y
        };

        // drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        // move points over time
        this.radians += this.velocity;
        // this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        // this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.x = canvas.width/2 + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = canvas.height/2 + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
      };

      this.draw = lastPoint => {
        c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
        // c.fillStyle = this.color;
        // c.fill();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
      };
    }


    // Implementation
    let particles = [];
    let objects;
    function init() {
      objects = []

      for (let i = 0; i < 4500; i++) {
        const radius = (Math.random() * 4) + 1
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colors)))
        // objects.push();
      }
    }

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      // c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = 'rgba(255, 255, 255, 0.05)';
      c.fillRect(0, 0, canvas.width, canvas.height);

      // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);

      particles.forEach(particle => {
        particle.update();
      });
    }

    init();
    animate();


  }

}


// function mapStateToProps(state) {
//   return { user: state.user };
// }

export default connect(null, { setLogin })(App);
// export default connect()(App);