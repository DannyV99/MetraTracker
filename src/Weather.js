import React, { Component } from 'react';
import './App.css';


class Weather extends Component {

    state = {
        temperature: [],
        clouds: [],
        wind: [],
        picture: []
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = () => {
        fetch('http://localhost:4000/Weather')
            .then(response => response.json())
            .then(response => this.setState(
                { temperature: response.data[0].current.temperature }))
            .catch(err => console.error(err))

        fetch('http://localhost:4000/Weather')
            .then(response => response.json())
            .then(response => this.setState(
                { clouds: response.data[0].current.skytext }))
            .catch(err => console.error(err))

        fetch('http://localhost:4000/Weather')
            .then(response => response.json())
            .then(response => this.setState(
                { wind: response.data[0].current.winddisplay }))
            .catch(err => console.error(err))

        fetch('http://localhost:4000/WeatherPictures')
            .then(response => response.json())
            .then(response => this.setState(
                { picture: response.data }))
            .catch(err => console.error(err))
    }


    currentTime = (a, b) => {
        var newDate = new Date()
        var hours = newDate.getHours()
        var minutes = newDate.getMinutes()
        return minutes < 10 ? hours + "0" + minutes : hours + "" + minutes;
    }

    render() {

        const { temperature } = this.state;
        const { clouds } = this.state;
        const { wind } = this.state;
        const { picture } = this.state;


        const PIC_URL = { picture }.picture.map(x => x.url)


        if (this.currentTime() < 1900 && this.currentTime() > 700) {
            if ({ clouds }.clouds === 'Sunny' || { clouds }.clouds === 'Mostly Clear') {
                var SUNNY = <img src={PIC_URL[1]}></img>
            } else if ({ clouds }.clouds === 'Partly Sunny' || { clouds }.clouds === 'Mostly Sunny') {
                var PART_SUNNY = <img src={PIC_URL[0]}></img>
            } else if ({ clouds }.clouds === 'Cloudy' || { clouds }.clouds === 'Mostly Cloudy') {
                var CLOUDY = <img src={PIC_URL[3]}></img>
            }
        } else {
            document.body.style.backgroundColor = "#2d3d65";
            document.body.style.color = "white";
            var NIGHT = <img src={PIC_URL[2]}></img>
        }

        var NEWTIME = <div style="text-align:center;padding:1em 0;"> <h3><a style="text-decoration:none;" href="https://www.zeitverschiebung.net/en/city/4887398"><span style="color:gray;">Current local time in</span><br />Chicago, United States</a></h3> <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FChicago" width="100%" height="115" frameborder="0" seamless></iframe> </div>



        


        return (

            <div className='weatherDiv'>
                <div className="MMM">
                    <h1>Temp: {temperature}</h1>
                    <h1>Conditions: {clouds}</h1>
                    <h1>Wind: {wind}</h1>

                    {SUNNY}
                    {NIGHT}
                    {PART_SUNNY}
                    {CLOUDY}

                </div>


                    <h1 className='title1'>METRA<br></br>TRACKER</h1>

            </div>

        )
    }
}


export default Weather;