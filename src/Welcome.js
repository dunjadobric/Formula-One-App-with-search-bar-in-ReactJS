import React from "react";

export default class Welcome extends React.Component {

    render() {
        return(
            <div style={{
                backgroundImage: "url(../img/cover.jpg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <p className="welcomePara">Formula One World Championship</p>
            </div>
        )
    }
}