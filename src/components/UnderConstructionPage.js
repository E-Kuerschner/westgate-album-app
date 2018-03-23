/**
 * Created by Erich on 3/9/2017.
 */
import React from "react";
import windowPic from "../../images/frames.jpg";
import VerticallyCentered from "./VerticallyCentered";
import API from "../api"

const underConstructionStyle = {
    width: "100%",
    height: "100%",
    fontFamily: "'Julius Sans One', sans-serif",
    color: "white",
    fontSize: 100,
    textAlign: "center"
};

class UnderConstructionPage extends React.Component {
    constructor() {
        super();
        this.state = { loadingImage: true }
    }

    componentDidMount() {
        API.getDays().then(res => console.log(res))

        const img = new Image();
        img.onload = () => {
            setTimeout(() => {
                this.setState({ loadingImage: false });
                this.page.insertBefore(img, this.page.firstChild);
            }, 2000);
        }
        img.src = windowPic;
        img.style.width = "100px"
        img.style.height = "100px"
    }

    render() {
        return (
            <div style={underConstructionStyle} ref={ node => this.page = node }>
                { this.state.loadingImage
                    ? "LOADING"
                    : <VerticallyCentered>
                        Coming Soon...
                    </VerticallyCentered>
                }
            </div>
        );
    }
}

export default UnderConstructionPage;