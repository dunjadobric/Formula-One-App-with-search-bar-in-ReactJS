import React from "react";
import * as $ from "jquery";
import Flag from 'react-flagkit';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default class TeamDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            standings: [],
            results: [],
            flags: [],
            races: []
        }
    }

    componentDidMount() {
        this.getTeams(this.props.location.state.year, this.props.match.params.id);
    }

    //   getTeams(year, id) {
    //     var url = `http://ergast.com/api/f1/${year}/constructors/${id}/results.json`;
    //     $.get(url, (data) => {
    //       console.log(data);
    //       this.setState({
    //           team: data.MRData.RaceTable.Races
    //       })
    //     })
    //   }

    getTeams(year, id) {
        var urlTeamsStandings = $.ajax(`http://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`);
        var urlTeamsResults = $.ajax(`http://ergast.com/api/f1/${year}/constructors/${id}/results.json`);
        var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        var urlRaces = $.ajax(`http://ergast.com/api/f1/${year}/results/1.json`);

        $.when(urlTeamsStandings, urlTeamsResults, urlFlags, urlRaces).done(function (data1, data2, data3, data4) {
            console.log(data1);
            console.log(data2);
            console.log(data3);
            console.log(data4);
            this.setState({
                standings: data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
                results: data2[0].MRData.RaceTable.Races,
                flags: JSON.parse(data3[0]),
                races: data4[0].MRData.RaceTable.Races
            })
        }.bind(this));
    }

    render() {
        return (
            <div className="teams">
                <div className="teamsDetails">

                    {this.state.standings.map((standing, i) => {
                        return (
                            <div key={i}>
                                <p>Constructor: {standing.Constructor.name} <a href={standing.Constructor.url} target="_blank"><i className="fas fa-external-link-alt"></i></a></p>
                                <p>Position: {standing.position}</p>
                                <p>Points: {standing.points}</p>
                                <p>Wins: {standing.wins}</p>
                                <p>Nationality: {standing.Constructor.nationality}</p>
                                <p>
                                    {this.state.flags.map((flag, i) => {

                                        if (standing.Constructor.nationality === "British") {
                                            if (flag.nationality === "British, UK") {
                                                return (
                                                    <Flag key={i} country="GB" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "Dutch") {
                                            if (flag.nationality === "Dutch, Netherlandic") {
                                                return (
                                                    <Flag key={i} country="NL" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "Monegasque") {
                                            if (flag.nationality === "Monégasque, Monacan") {
                                                return (
                                                    <Flag key={i} country="MC" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "New Zealander") {
                                            if (flag.nationality === "New Zealand, NZ") {
                                                return (
                                                    <Flag key={i} country="NZ" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "American") {
                                            if (flag.en_short_name === "United States of America") {
                                                return (
                                                    <Flag key={i} country="US" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "Hungarian") {
                                            if (flag.nationality === "Hungarian, Magyar") {
                                                return (
                                                    <Flag key={i} country="HU" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "Liechtensteiner") {
                                            if (flag.nationality === "Liechtenstein") {
                                                return (
                                                    <Flag key={i} country="LI" size={40} />
                                                )
                                            }
                                        } else if (standing.Constructor.nationality === "Rhodesian") {
                                            if (flag.nationality === "Zimbabwean") {
                                                return (
                                                    <Flag key={i} country="ZW" size={40} />
                                                )
                                            }
                                        }
                                        else {
                                            if (standing.Constructor.nationality === flag.nationality) {
                                                return (
                                                    <Flag key={i} country={flag.alpha_2_code} size={40} />
                                                )
                                            }
                                        }
                                    })}
                                </p>
                            </div>
                        )
                    })}

                </div>
                <div className="teamsResults">
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Race Name</th>
                                <th>Date</th>
                                <th>Driver 1</th>
                                <th>Position</th>
                                <th>Points</th>
                                <th>Driver 2</th>
                                <th>Position</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map((result, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{result.round}</td>
                                        <td>
                                            <div>
                                                {this.state.flags.map((flag, i) => {
                                                    if (result.Circuit.Location.country === "Azerbaijan") {
                                                        if (flag.en_short_name === "Azerbaijan") {
                                                            return (
                                                                // <Flag country={"AZ"} size={25}/>
                                                                <img src="/img/AZ_2.png" />
                                                            )
                                                        }
                                                    } else if (result.Circuit.Location.country === "UK") {
                                                        if (flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                                                            return (
                                                                <Flag country={"GB"} size={25} />
                                                            )
                                                        }
                                                    } else if (result.Circuit.Location.country === "Russia") {
                                                        if (flag.en_short_name === "Russian Federation") {
                                                            return (
                                                                <Flag country={"RU"} size={25} />
                                                            )
                                                        }
                                                    } else if (result.Circuit.Location.country === "Korea") {
                                                        if (flag.en_short_name === "Korea (Republic of)") {
                                                            return (
                                                                <Flag country={"KR"} size={25} />
                                                            )
                                                        }
                                                    } else if (result.Circuit.Location.country === "USA") {
                                                        if (flag.en_short_name === "United States of America") {
                                                            return (
                                                                <Flag country={"US"} size={25} />
                                                            )
                                                        }
                                                    }

                                                    else {
                                                        if (result.Circuit.Location.country === flag.en_short_name) {
                                                            return (
                                                                <Flag country={flag.alpha_2_code} size={25} />
                                                            )
                                                        }
                                                    }
                                                })}

                                                {this.state.races.map((race, i) => {
                                                    if (result.round === race.round) {
                                                        return (
                                                            <Link to={{ pathname: `/initialTable/races/${race.round}`, state: { year: this.props.location.state.year } }}>
                                                                {result.raceName}
                                                            </Link>
                                                        )
                                                    }
                                                })
                                                }

                                            </div>
                                        </td>
                                        <td>{result.date}</td>
                                        <td>
                                            <div>
                                                {this.state.flags.map((flag, i) => {
                                                    if (result.Results[0].Driver.nationality === "British") {
                                                        if (flag.nationality === "British, UK") {
                                                            return (
                                                                <Flag key={i} country="GB" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "Dutch") {
                                                        if (flag.nationality === "Dutch, Netherlandic") {
                                                            return (
                                                                <Flag key={i} country="NL" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "Monegasque") {
                                                        if (flag.nationality === "Monégasque, Monacan") {
                                                            return (
                                                                <Flag key={i} country="MC" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "New Zealander") {
                                                        if (flag.nationality === "New Zealand, NZ") {
                                                            return (
                                                                <Flag key={i} country="NZ" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "American") {
                                                        if (flag.en_short_name === "United States of America") {
                                                            return (
                                                                <Flag key={i} country="US" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "Hungarian") {
                                                        if (flag.nationality === "Hungarian, Magyar") {
                                                            return (
                                                                <Flag key={i} country="HU" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "Liechtensteiner") {
                                                        if (flag.nationality === "Liechtenstein") {
                                                            return (
                                                                <Flag key={i} country="LI" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[0].Driver.nationality === "Rhodesian") {
                                                        if (flag.nationality === "Zimbabwean") {
                                                            return (
                                                                <Flag key={i} country="ZW" size={25} />
                                                            )
                                                        }
                                                    }
                                                    else {
                                                        if (result.Results[0].Driver.nationality === flag.nationality) {
                                                            return (
                                                                <Flag key={i} country={flag.alpha_2_code} size={25} />
                                                            )
                                                        }
                                                    }
                                                })}
                                                {result.Results[0].Driver.givenName + " " + result.Results[0].Driver.familyName}
                                            </div>
                                        </td>
                                        <td>{result.Results[0].position}</td>
                                        <td>{result.Results[0].points}</td>
                                        <td>
                                            <div>
                                                {this.state.flags.map((flag, i) => {
                                                    if (result.Results[1].Driver.nationality === "British") {
                                                        if (flag.nationality === "British, UK") {
                                                            return (
                                                                <Flag key={i} country="GB" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "Dutch") {
                                                        if (flag.nationality === "Dutch, Netherlandic") {
                                                            return (
                                                                <Flag key={i} country="NL" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "Monegasque") {
                                                        if (flag.nationality === "Monégasque, Monacan") {
                                                            return (
                                                                <Flag key={i} country="MC" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "New Zealander") {
                                                        if (flag.nationality === "New Zealand, NZ") {
                                                            return (
                                                                <Flag key={i} country="NZ" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "American") {
                                                        if (flag.en_short_name === "United States of America") {
                                                            return (
                                                                <Flag key={i} country="US" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "Hungarian") {
                                                        if (flag.nationality === "Hungarian, Magyar") {
                                                            return (
                                                                <Flag key={i} country="HU" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "Liechtensteiner") {
                                                        if (flag.nationality === "Liechtenstein") {
                                                            return (
                                                                <Flag key={i} country="LI" size={25} />
                                                            )
                                                        }
                                                    } else if (result.Results[1].Driver.nationality === "Rhodesian") {
                                                        if (flag.nationality === "Zimbabwean") {
                                                            return (
                                                                <Flag key={i} country="ZW" size={25} />
                                                            )
                                                        }
                                                    }
                                                    else {
                                                        if (result.Results[1].Driver.nationality === flag.nationality) {
                                                            return (
                                                                <Flag key={i} country={flag.alpha_2_code} size={25} />
                                                            )
                                                        }
                                                    }
                                                })}
                                                {result.Results[1] !== undefined ?
                                                    result.Results[1].Driver.givenName + " " + result.Results[1].Driver.familyName : "-"}
                                            </div>
                                        </td>
                                        <td>{result.Results[1] !== undefined ?
                                            result.Results[1].position : "-"}</td>
                                        <td>{result.Results[1] !== undefined ?
                                            result.Results[1].points : "-"}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}