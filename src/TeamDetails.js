import React from "react";
import * as $ from "jquery";

export default class TeamDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            standings: [],
            results: [],
            flags: []
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

        $.when(urlTeamsStandings, urlTeamsResults, urlFlags).done(function (data1, data2, data3) {
            console.log(data1);
            console.log(data2);
            console.log(data3);
            this.setState({
                standings: data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
                results: data2[0].MRData.RaceTable.Races,
                flags: JSON.parse(data3[0])
            })
        }.bind(this)
        );
    }

    render() {
        return (
            <div className="teams">
                <div className="teamsDetails">

                    {this.state.standings.map((standing, i) => {
                        return (
                            <div key={i}>
                                <p>Constructor: {standing.Constructor.name}</p>
                                <p>Position: {standing.position}</p>
                                <p>Points: {standing.points}</p>
                                <p>Wins: {standing.wins}</p>
                                <p>Read more: <a href={standing.Constructor.url} target="_blank"><i className="fas fa-external-link-alt"></i></a></p>
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
                                <th>Time</th>
                                <th>Driver 2</th>
                                <th>Position</th>
                                <th>Points</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map((result, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{result.round}</td>
                                        <td>{result.raceName}</td>
                                        <td>{result.date}</td>
                                        <td>{result.Results[0].Driver.familyName}</td>
                                        <td>{result.Results[0].position}</td>
                                        <td>{result.Results[0].points}</td>
                                        <td>{result.Results[0].Time !== undefined ?
                                            result.Results[0].Time.time : "-"}</td>
                                        <td>{result.Results[1].Driver.familyName}</td>
                                        <td>{result.Results[1].position}</td>
                                        <td>{result.Results[1].points}</td>
                                        <td>{result.Results[1].Time !== undefined ?
                                            result.Results[1].Time.time : "-"}</td>
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