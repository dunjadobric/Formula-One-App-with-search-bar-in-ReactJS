import React from "react";
import * as $ from "jquery";
import Flag from 'react-flagkit';

export default class DriversTable extends React.Component {
  constructor() {
    super();

    this.state = {
      drivers: [],
      flags: []
    }
  }

  componentDidMount() {
    this.getDrivers(this.props.location.state.year);
  }

  //single call
  // getDrivers(year) {
  //   var url = `http://ergast.com/api/f1/${year}/driverStandings.json`;
  //   $.get(url, (data) => {
  //     console.log(data);
  //   })
  // }


  //just for more than one call, not working with single code when it throws error
  getDrivers(year) {
    var urlDrivers = $.ajax(`http://ergast.com/api/f1/${year}/driverStandings.json`);
    var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

    $.when(urlDrivers, urlFlags).done(
      function(data1, data2) {
        console.log(data1);
        console.log(data2);

        this.setState({
          drivers: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings,
          flags: JSON.parse(data2[0])
        })

      }.bind(this)
    );
  }

  render() {
    return (
      <div className="driversTable">
        <table>
          <thead>
            <tr>
              <th>{this.props.location.state.year}</th>
            </tr>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Team</th>
              <th>Points</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {this.state.drivers.map((driver, i) => {
              return (
                <tr key={i}>
                  <td>{driver.position}</td>
                    
                    <td>
                      <div>
                        {this.state.flags.map((flag, i) => {
                          if(driver.Driver.nationality === flag.nationality) {
                            return(
                              <Flag key={i} country={flag.alpha_2_code} size={25}/>
                            )
                          }
                        })}
                        {driver.Driver.givenName + " " + driver.Driver.familyName}
                      </div>
                    </td>
                  
                  <td>{driver.Driver.dateOfBirth}</td>
                  <td>{driver.Constructors[0].name}</td>
                  <td>{driver.points}</td>
                  <td>{driver.wins}</td>
                  <td><a href={driver.Driver.url} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}