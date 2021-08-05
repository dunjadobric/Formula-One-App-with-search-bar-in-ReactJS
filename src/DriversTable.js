import React from "react";
import * as $ from "jquery";
import Flag from 'react-flagkit';

export default class DriversTable extends React.Component {
  constructor() {
    super();

    this.state = {
      drivers: [],
      flags: [],
      teams: [],
      teamsSeason: []
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
    var urlTeams = $.ajax(`http://ergast.com/api/f1/${year}/constructorStandings.json`);

    $.when(urlDrivers, urlFlags, urlTeams).done(
      function(data1, data2, data3) {
        console.log(data1);
        console.log(data2);
        console.log(data3);

        this.setState({
          drivers: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings,
          flags: JSON.parse(data2[0]),
          teams: data3[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
          teamsSeason: data3[0].MRData.StandingsTable.StandingsLists
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
 
                          if (driver.Driver.nationality === "British") {
                            if(flag.nationality === "British, UK") {
                              return(
                                <Flag key={i} country="GB" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "Dutch") {
                            if(flag.nationality === "Dutch, Netherlandic") {
                              return(
                                <Flag key={i} country="NL" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "Monegasque") {
                            if(flag.nationality === "Monégasque, Monacan") {
                              return(
                                <Flag key={i} country="MC" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "New Zealander") {
                            if(flag.nationality === "New Zealand, NZ") {
                              return(
                                <Flag key={i} country="NZ" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "American") {
                            if(flag.en_short_name === "United States of America") {
                              return(
                                  <Flag key={i} country="US" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "Hungarian") {
                            if(flag.nationality === "Hungarian, Magyar") {
                              return(
                                  <Flag key={i} country="HU" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "Liechtensteiner") {
                            if(flag.nationality === "Liechtenstein") {
                              return(
                                  <Flag key={i} country="LI" size={25}/>
                              )
                            }
                          } else if (driver.Driver.nationality === "Rhodesian") {
                            if(flag.nationality === "Zimbabwean") {
                              return(
                                  <Flag key={i} country="ZW" size={25}/>
                              )
                            }
                          }
                          else {
                            if(driver.Driver.nationality === flag.nationality) {
                              return(
                                <Flag key={i} country={flag.alpha_2_code} size={25}/>
                              )
                            } 
                          }
                        })}
                        {driver.Driver.givenName + " " + driver.Driver.familyName}
                      </div>
                    </td>
                  
                  <td>{driver.Driver.dateOfBirth}</td>
                  <td>
                    <div>
                      {this.state.flags.map((flag, i) => {

                        if (driver.Constructors[0].nationality === "British") {
                          if(flag.nationality === "British, UK") {
                            return(
                              <Flag key={i} country="GB" size={25}/>
                            )
                          }
                        } else if (driver.Constructors[0].nationality === "American") {
                          if(flag.en_short_name === "United States of America") {
                            return(
                                <Flag key={i} country="US" size={25}/>
                            )
                          }
                        } else if (driver.Constructors[0].nationality === "Dutch") {
                          if(flag.nationality === "Dutch, Netherlandic") {
                            return(
                                <Flag key={i} country="NL" size={25}/>
                            )
                          }
                        } else if (driver.Constructors[0].nationality === "Hong Kong") {
                          if(flag.nationality === "Hong Kong, Hong Kongese") {
                            return(
                                <Flag key={i} country="HK" size={25}/>
                            )
                          }
                        } else if (driver.Constructors[0].nationality === "New Zealand") {
                          if(flag.nationality === "New Zealand, NZ") {
                            return(
                              <Flag key={i} country="NZ" size={25}/>
                            )
                          }
                        }
                        else {
                          if(driver.Constructors[0].nationality === flag.nationality) {
                            return (
                              <Flag key={i} country={flag.alpha_2_code} size={25}/>
                            )
                          }
                        }
                      })}
                      {/* {driver.Constructors[0].name} */}
                      
                      {this.state.teams.map((team, i) => {
                          if(driver.Constructors[0].name === team.Constructor.name) {
                            return(
                              <p key={i}>{team.Constructor.name}</p>
                            )
                          } 
                      })}

                      {this.state.teamsSeason.map((season, i) => {
                        if(driver.Constructors[0].name === "Phillips"){
                          if(season.season === "1958" || season.season === "1960") {
                            return(
                              <p key={i}>{driver.Constructors[0].name}</p>
                            )
                          }
                        } else if(driver.Constructors[0].name === "Watson"){
                          if(season.season === "1958" || season.season === "1959" || season.season === "1960") {
                            return(
                              <p key={i}>{driver.Constructors[0].name}</p>
                            )
                          }
                        } else if(driver.Constructors[0].name === "Epperly"){
                          if(season.season === "1958" || season.season === "1959" || season.season === "1960") {
                            return(
                              <p key={i}>{driver.Constructors[0].name}</p>
                            )
                          }
                        } else if(driver.Constructors[0].name === "Kurtis Kraft"){
                          if(season.season === "1958") {
                            return(
                              <p key={i}>{driver.Constructors[0].name}</p>
                            )
                          }
                        } else if(driver.Constructors[0].name === "Lesovsky"){
                          if(season.season === "1959" || season.season === "1960") {
                            return(
                              <p key={i}>{driver.Constructors[0].name}</p>
                            )
                          }
                        } else if(driver.Constructors[0].name === "Trevis"){
                          if(season.season === "1960") {
                            return(
                              <p key={i}>{driver.Constructors[0].name}</p>
                            )
                          }
                        } 
                      })}
                      
                    </div>
                  </td>
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