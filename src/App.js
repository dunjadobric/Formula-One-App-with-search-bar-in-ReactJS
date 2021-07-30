import React from "react";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Welcome from "./Welcome";
import DriversTable from "./DriversTable";
import NotFound from "./NotFound";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }

        this.inputFunc = this.inputFunc.bind(this);
        this.resetFunc = this.resetFunc.bind(this);
        this.showResultsFunc = this.showResultsFunc.bind(this);
    }

    inputFunc(event) {
        this.setState({
            value: event.target.value
        })
        console.log(this.state.value);
    }

    resetFunc() {
        this.setState({
            value: ''
        })
        console.log("Reset func");
    }

    showResultsFunc() {
        console.log("User choosed", this.state.value, "year");
        // if(this.state.value < 1950) {
        //     alert("Data do not exist. First Forumula One Championship was held in 1950.")
        // }
    }

    render() {
        return(
            <div>
                <Router>
                    <div className="header">
                        <div className="headerHome">
                            <Link to="/">
                                <input type="button" value="Home" className="btn" onClick={this.resetFunc}/>
                            </Link> 
                        </div>

                        <div className="headerInput">
                            <input type="number" placeholder="Enter year..." value={this.state.value} onChange={this.inputFunc}/>
                        </div>
                        
                        
                        <div className="headerClick">
                            <Link to={{pathname: "/initialTable", state: {year: this.state.value}}}>
                                <input type="button" value="Show results" className="btn" onClick={this.showResultsFunc}/>
                            </Link>
                        </div>
                        
                    </div>
                    <div className="content">
                        <Route path="/" exact component={Welcome}/>
                        {this.state.value > 1949 ? <Route path="/initialTable" exact component={DriversTable}/> : 
                        <Route path="/initialTable" exact component={NotFound}/>}
                    </div>
                </Router>
            </div>
        )
    }
}