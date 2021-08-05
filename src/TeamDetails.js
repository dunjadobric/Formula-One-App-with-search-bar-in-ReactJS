import React from "react";
import * as $ from "jquery";

export default class TeamDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            team: []
        }
    }

    componentDidMount() {
        this.getTeams(this.props.location.state.year, this.props.match.params.id);
      }
    
      getTeams(year, id) {
        var url = `http://ergast.com/api/f1/${year}/constructors/${id}/results.json`;
        $.get(url, (data) => {
          console.log(data);
          this.setState({
              team: data.MRData.RaceTable.Races
          })
        })
      }

    render() {
        return(
            <div>
                Team Details
            </div>
        )
    }
}