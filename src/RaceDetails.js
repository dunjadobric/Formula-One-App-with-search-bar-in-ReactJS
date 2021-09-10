import React from "react";
import * as $ from "jquery";
import Flag from 'react-flagkit';
import { CircleSpinner } from "react-spinners-kit";

export default class RaceDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            results: [],
            resultsTable: [],
            flags: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getResults(this.props.location.state.year, this.props.match.params.id);
    }

    getResults(year, id) {
        var urlResults = $.ajax(`http://ergast.com/api/f1/${year}/${id}/results.json`);
        var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

        $.when(urlResults, urlFlags).done(function (data1, data2) {
            console.log(data1);
            console.log(data2);
            this.setState({
                results: data1[0].MRData.RaceTable.Races,
                resultsTable: data1[0].MRData.RaceTable.Races[0].Results,
                flags: JSON.parse(data2[0]),
                isLoading: false
            })
        }.bind(this));
    }

    render() {
        const { loading } = this.state;
        if(this.state.isLoading) {
            return(
                <div className="racesTable">
                    <div className="spinner">
                        <CircleSpinner size={50} color="#ff8c00" loading={loading}/>
                    </div>
                </div>
            )
        }
        return (
            <div className="racesTable table">
                {/* racesDetails */}
                <div className="racesDetails">
                    {this.state.results.map((result, i) => {
                        return (
                            <div key={i}>
                                <p>Date: {result.date}</p>
                                <p>Race Name: {result.raceName} <a href={result.url} target="_blank"><i className="fas fa-external-link-alt"></i></a></p>
                                <p>Circuit Name: {result.Circuit.circuitName} <a href={result.Circuit.url} target="_blank"><i className="fas fa-external-link-alt"></i></a></p>
                                <p>Locality: {result.Circuit.Location.locality}</p>
                                <p>Country: {result.Circuit.Location.country}</p>
                                <p>
                                    {this.state.flags.map((flag, i) => {
                                        if (result.Circuit.Location.country === "Azerbaijan") {
                                            if (flag.en_short_name === "Azerbaijan") {
                                                return (
                                                    // <Flag country={"AZ"} size={25}/>
                                                    <img src="/img/AZ.png" />
                                                )
                                            }
                                        } else if (result.Circuit.Location.country === "UK") {
                                            if (flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                                                return (
                                                    <Flag country={"GB"} size={40} />
                                                )
                                            }
                                        } else if (result.Circuit.Location.country === "Russia") {
                                            if (flag.en_short_name === "Russian Federation") {
                                                return (
                                                    <Flag country={"RU"} size={40} />
                                                )
                                            }
                                        } else if (result.Circuit.Location.country === "Korea") {
                                            if (flag.en_short_name === "Korea (Republic of)") {
                                                return (
                                                    <Flag country={"KR"} size={40} />
                                                )
                                            }
                                        } else if (result.Circuit.Location.country === "USA") {
                                            if (flag.en_short_name === "United States of America") {
                                                return (
                                                    <Flag country={"US"} size={40} />
                                                )
                                            }
                                        }

                                        else {
                                            if (result.Circuit.Location.country === flag.en_short_name) {
                                                return (
                                                    <Flag country={flag.alpha_2_code} size={40} />
                                                )
                                            }
                                        }
                                    })}
                                </p>
                            </div>
                        )
                    })}
                </div>
                {/* racesDetails */}

                {/* racesResults    */}
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Number</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Laps</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.resultsTable.map((result, i) => {
                            return (
                                <tr key={i}>
                                    <td>{result.position}</td>
                                    <td>
                                        <div>
                                            {this.state.flags.map((flag, i) => {
                                                if (result.Driver.nationality === "British") {
                                                    if (flag.nationality === "British, UK") {
                                                        return (
                                                            <Flag key={i} country="GB" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "Dutch") {
                                                    if (flag.nationality === "Dutch, Netherlandic") {
                                                        return (
                                                            <Flag key={i} country="NL" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "Monegasque") {
                                                    if (flag.nationality === "Monégasque, Monacan") {
                                                        return (
                                                            <Flag key={i} country="MC" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "New Zealander") {
                                                    if (flag.nationality === "New Zealand, NZ") {
                                                        return (
                                                            <Flag key={i} country="NZ" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "American") {
                                                    if (flag.en_short_name === "United States of America") {
                                                        return (
                                                            <Flag key={i} country="US" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "Hungarian") {
                                                    if (flag.nationality === "Hungarian, Magyar") {
                                                        return (
                                                            <Flag key={i} country="HU" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "Liechtensteiner") {
                                                    if (flag.nationality === "Liechtenstein") {
                                                        return (
                                                            <Flag key={i} country="LI" size={25} />
                                                        )
                                                    }
                                                } else if (result.Driver.nationality === "Rhodesian") {
                                                    if (flag.nationality === "Zimbabwean") {
                                                        return (
                                                            <Flag key={i} country="ZW" size={25} />
                                                        )
                                                    }
                                                }
                                                else {
                                                    if (result.Driver.nationality === flag.nationality) {
                                                        return (
                                                            <Flag key={i} country={flag.alpha_2_code} size={25} />
                                                        )
                                                    }
                                                }
                                            })}
                                            {result.Driver.givenName + " " + result.Driver.familyName}
                                        </div>
                                    </td>
                                    <td>{result.number}</td>
                                    <td>
                                        <div>
                                            {this.state.flags.map((flag, i) => {
                                                if (result.Constructor.nationality === "British") {
                                                    if (flag.nationality === "British, UK") {
                                                        return (
                                                            <Flag key={i} country="GB" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "Dutch") {
                                                    if (flag.nationality === "Dutch, Netherlandic") {
                                                        return (
                                                            <Flag key={i} country="NL" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "Monegasque") {
                                                    if (flag.nationality === "Monégasque, Monacan") {
                                                        return (
                                                            <Flag key={i} country="MC" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "New Zealander") {
                                                    if (flag.nationality === "New Zealand, NZ") {
                                                        return (
                                                            <Flag key={i} country="NZ" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "American") {
                                                    if (flag.en_short_name === "United States of America") {
                                                        return (
                                                            <Flag key={i} country="US" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "Hungarian") {
                                                    if (flag.nationality === "Hungarian, Magyar") {
                                                        return (
                                                            <Flag key={i} country="HU" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "Liechtensteiner") {
                                                    if (flag.nationality === "Liechtenstein") {
                                                        return (
                                                            <Flag key={i} country="LI" size={25} />
                                                        )
                                                    }
                                                } else if (result.Constructor.nationality === "Rhodesian") {
                                                    if (flag.nationality === "Zimbabwean") {
                                                        return (
                                                            <Flag key={i} country="ZW" size={25} />
                                                        )
                                                    }
                                                }
                                                else {
                                                    if (result.Constructor.nationality === flag.nationality) {
                                                        return (
                                                            <Flag key={i} country={flag.alpha_2_code} size={25} />
                                                        )
                                                    }
                                                }
                                            })}
                                            {result.Constructor.name}
                                        </div>
                                    </td>
                                    <td>{result.grid}</td>
                                    <td>{result.laps}</td>
                                    <td>{result.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}