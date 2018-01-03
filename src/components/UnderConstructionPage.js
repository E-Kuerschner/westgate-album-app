/**
 * Created by Erich on 3/9/2017.
 */
import React from "react";
import windowPic from "../../images/window.jpg";
import VerticallyCentered from "./VerticallyCentered";

const underConstructionStyle = {
    width: "100%",
    height: "100%",
    fontFamily: "'Julius Sans One', sans-serif",
    color: "white",
    fontSize: 100,
    textAlign: "center"
};

const UnderConstructionPage = () => (
    <div style={underConstructionStyle}>
    	<VerticallyCentered>
        	Coming Soon...
    	</VerticallyCentered>
    </div>
);

export default UnderConstructionPage;