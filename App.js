import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = "121c772853fe9f8367b2d37a5cf1c2b0";

export default class App extends Component {
  state={
    isLoaded: false,
    error: null,
    temp: null,
    name: null,
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
        this._getWeather(position.coords.latitude, position.coords.longitude)
    },
    error => {
      this.setState({
        error: error
      })
    });
  }

  _getWeather = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temp: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true
      })
    })
  }
  render() {
    const {name, temp, isLoaded, error} = this.state;
    return (
      <View style={styles.container}>
      <StatusBar hidden={true}/>
    {isLoaded ? ( 
    <Weather 
    weatherName={name}
    temp={temp}/> 
  ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Getting the Weather</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex:1,
    backgroundColor: '#F7DC6F',
    justifyContent: 'flex-end',
    paddingLeft:25,
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent"
  },
  loadingText: {
    fontSize: 40,
    marginBottom: 100,
  }
});
