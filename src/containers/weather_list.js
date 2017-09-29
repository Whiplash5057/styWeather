import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    
    renderWeather(cityData) {
        // console.log(cityData);
        const name = cityData.city.name;
        const temp = cityData.list.map(weather => weather.main.temp);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;
        // console.log(temp);
        return (
          <tr key={ cityData.city.coord.lat }>
            <td> <GoogleMap lat={lat} lon={lon} /> </td>
            <td><Chart data={temp} color='orange' units='K'/></td>
            <td><Chart data={pressure} color='green' units='hPa' /></td>
            <td><Chart data={humidity} color='black' units='%' /></td>
          </tr>
        );
      }

    render() {
        return (
          
          <div className="lol">
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th> City </th>
                    <th> Temperature (K) </th>
                    <th> Pressure (hPa)</th>
                    <th> Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                { this.props.weather.map(this.renderWeather) }
                </tbody>
            </table>
          </div>
        );
    }

}

function mapStateToProps({ weather }) {
    //({weather}) is the same as (state.weather)
    //{weather}  is the same as weather: weather
    // console.log(weather);
    return { weather };
}
  
export default connect(mapStateToProps)(WeatherList);