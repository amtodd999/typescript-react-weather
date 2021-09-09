import React, {Component} from "react";

type GeoLocationProps = {};
type GeoLocationState = {
    latitude: number,
    longitude: number,
    temp: number,
    description: string,
};

export class GeoLocation extends Component <GeoLocationProps, GeoLocationState> {
    constructor(props: GeoLocationProps) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            temp: 0,
            description: "",
        }
        this.setLocation = this.setLocation.bind(this);
        this.setWeather = this.setWeather.bind(this);
    }

    componentDidMount() {
        this.setLocation();
        this.setWeather();
    }

    setLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }

    setWeather() {
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=imperial&appid=0a5aa8acd47fcd697317e35391c90449`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    temp: json.main.temp,
                    description: json.weather[0].description,
                })
            })
            .catch(err => console.log(err))
    }
    
    render () {
        return (
            <div>
                <h1>Current Weather</h1>
                <h3>It is currently {this.state.temp}&#8457; with {this.state.description}</h3> 
            </div>
        )
    }
}