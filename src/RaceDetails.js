import React from "react";
import * as $ from "jquery";
import Flag from 'react-flagkit';

export default class RaceDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            results: [],
            flags: []
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
                flags: JSON.parse(data2[0])
            })
        }.bind(this));
    }

    render() {
        return (
            <div className="racesTable">
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
                     
                 </table>
            </div>
        )
    }
}