import React, { Component } from 'react';
import './App.css';
import Weather from './Weather'
import Clock from 'react-clock'

class App extends Component {

  state = {
    databaseTimes: [],
  }

  componentDidMount() {
  }

  edisonAPI = _ => {
    this.getInfo('WeekdaysToTheCity')
  }

  otcAPI = _ => {
    this.getInfo('WeekdaysFromTheCity')
  }

  getInfo = (a) => {
    fetch('http://localhost:4000/' + a)
      .then(response => response.json())
      .then(response => this.setState(
        { databaseTimes: response.data }))
      .catch(err => console.error(err))
  }


  currentTime = (a, b) => {
    var newDate = new Date()
    var hours = newDate.getHours()
    var minutes = newDate.getMinutes()

    return minutes < 10 ? hours + "0" + minutes : hours + "" + minutes;
  }

  renderStop = ({ TrainStop }) => <li key={TrainStop.PRIMARY_KEY}>{TrainStop}</li>
  renderTime = ({ DepartureTime }) => <li key={DepartureTime.PRIMARY_KEY}>{DepartureTime}</li>
  renderToGo = ({ MinutesToGo }) => <div key={MinutesToGo.PRIMARY_KEY}>{MinutesToGo}</div>


  render() {

    // list of trains {TrainStop: String, DepartureTime: Int, id: Int}
    // filter out old trains
    // convert to int


    const { databaseTimes } = this.state;



    // bucket is an array of train objects
    var bucket = databaseTimes.filter(e => e.DepartureTime > this.currentTime());
    var newBucket = bucket.map(x => Object.assign({ MinutesToGo: timeConvert((parseInt(x.DepartureTime)) - (parseInt(this.currentTime()))) }, x));



    function timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      if (rhours > 0) {
        return "Plenty of Time"
      } else { return rhours + " hr(s) and " + rminutes + " min(s)" }
    }

    const STATION = <li className='div1'>{newBucket.map(this.renderStop)}</li>
    const TIME = <li className='div2'>{newBucket.map(this.renderTime)}</li>
    const MINUTESTOGO = newBucket.map(this.renderToGo)[0]
    const EDISONPARK = <button type="submit" onClick={this.edisonAPI}>EDISON PARK</button>
    const OGLEVIE = <button type="submit" onClick={this.otcAPI}>OGLEVIE TRANSPORTATION CENTER</button>



    




    return (

      <div className="bigBox">
        <div className="App">

          <Weather />
          <iframe className = "clock" src="http://free.timeanddate.com/clock/i6jjvvaq/n64/szw160/szh160/hoc000/hbw4/cf100/hgr0/fav0/fiv0/mqc000/mqs3/mql25/mqw6/mqd96/mhc000/mhs3/mhl20/mhw6/mhd96/mmc000/mms3/mml10/mmw2/mmd96/hhw16/hmw16/hmr4/hsc000/hss3/hsl90" frameborder="0" width="160" height="160"></iframe>

          <h1>{EDISONPARK}<br></br>
            {OGLEVIE}</h1>



          <div className='div3'>
            {'You have:'}<br></br>
            {MINUTESTOGO}
            {'Until Departure'}
          </div>

          <div className='table'>
            <table>
              <tr>
                <th>Train Station</th>
                <th>Departure Times</th>
              </tr>
              <tr>
                <td>{STATION}</td>
                <td>{TIME}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

    )
  }
}


export default App;
