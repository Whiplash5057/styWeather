import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather, setLogin, emptyWeather } from '../actions/index';
import * as firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-responsive-modal';


class SearchBar extends Component {


    static contextTypes = {
        router: React.PropTypes.object.isRequired
      }


    constructor(props) {
        super(props);
    
        this.state = { 
            term: '',
            open: false,
         };
    
        //because the context of the onInputChange will change to the Component
        //we will change the context to the class context(component context)
        //so that when passing on a method, the method will get the right context
    
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.logMeOUt = this.logMeOUt.bind(this);
    }

    componentDidMount() {

        let myLatlng = {lat: 19.0760, lng: 72.8777};
        let geocoder = new google.maps.Geocoder;

        let map = new google.maps.Map(this.refs.mapMain, {
            zoom: 12,
            center: myLatlng,
        });
        
        google.maps.event.addListener(map, 'click',( event ) => {
            // alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
            var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            geocoder.geocode({'location': latlng}, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        // console.log(results[0].formatted_address);
                        this.setState({ term: results[0].formatted_address });
                    }
                }
            });
          });


        var defaultBounds = new google.maps.LatLngBounds(
            // new google.maps.LatLng(19.0760, 72.8777),
            // new google.maps.LatLng(19.0660, 72.8977)
        );
          
          var input = document.querySelector('.pac-input');
          var options = {
            types: ['(cities)'],
            bounds: defaultBounds,
          };
          
          let autocomplete = new google.maps.places.Autocomplete(input, options);
          autocomplete.bindTo('bounds', map);

    }

    onInputChange(event) {
        
        this.setState({ term: event.target.value });
        // console.log(this.state.term);
    }
    
    onFormSubmit(event) {
        event.preventDefault();
    
        //fetch weather data
        let inputVal = document.querySelector('.pac-input');
        // console.log(inputVal.value);
        if(this.state.term.length > 0) {
            this.props.fetchWeather(inputVal.value, ()=> {
                console.log('error');
                this.onOpenModal();
            });
            this.setState({ term: '' });
            inputVal.value = '';
        }
    }

    logMeOUt() {
        // console.log('logout');
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            let sendToActionCreator = {
                login: false,
                user: { displayName:'', photoURL:'' }
            }
    
            this.props.setLogin(sendToActionCreator, () => {
                // console.log('done');
            });
            this.props.emptyWeather();

            this.context.router.push('/')

            // console.log('signout success')
          }, function(error) {
            // An error happened.
            // console.log('signout error')
          });
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };
    

    render() {
        const { open } = this.state;

        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} little >
                    <br/>
                    <div className="dialogAlertText" >
                        <div className="leftAlignUls">The city you have entered doesn't exists. <br/>
                        Make sure you've got the right city name.
                        </div>
                    </div>
                </Modal>

                <div className="headerEff">
                    <div className="profile">
                        <span className="profile_image"><img src={ this.props.imageLink } /></span>
                        <span className="profile_name">{ this.props.username }</span>
                    </div>
                    <div className="logout" onClick={this.logMeOUt}>Logout</div>
                </div>
                <hr/>
                <form onSubmit={this.onFormSubmit} className='input-group'>
                    <input
                    placeholder='Enter the city of choice or click on the map'
                    className='form-control pac-input'
                    value={this.state.term}
                    onChange={this.onInputChange}
                    />
                    <span className='input-group-btn'>
                    <button type='submit' className='btn btn-secondary'>Submit</button>
                    </span>
                </form>
                <div ref='mapMain' className="mapContainer"/>
            </div>
        );
      }

}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchWeather, setLogin }, dispatch);
//   }
function mapStateToProps({ authenticated }){
    // console.log(authenticated.user.displayName, authenticated.user.photoURL);
    if(typeof(authenticated.user) != undefined){
        return { 
            username: authenticated.user.displayName,
            imageLink: authenticated.user.photoURL,
          };
    }
      
}

export default connect(mapStateToProps, { fetchWeather, setLogin, emptyWeather })(SearchBar);