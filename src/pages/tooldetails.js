import {
    useParams, useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const tooldetailscontainer = {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-evenly",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "2%"
};

const toolImage = {
    display: "flex",
    width: "50%"
};

const toolSideColumn = {
    width: "50%",
    margin:"5%"
};

const ToolDetails = () => {
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const toolname = queryParameters.get("name");
    const [toolDescription, settoolDescription] = useState();
    const [imgUrl, setimgUrl] = useState();
    const [websiteUrl, setwebsiteUrl] = useState();

    const fetchPrimaryPokemonData = async () => {
        try {
            if (toolname) {
                await axios
                    .get("https://concerned-worm-handbag.cyclic.app/aitools?toolName=" + toolname)
                    .then((response) => {
                        const data = response.data[0];
                        settoolDescription(data.toolDescription);
                        setimgUrl("https://cdn.sanity.io/images/u0v1th4q/production/" + data.ImageUrl);
                        setwebsiteUrl(data.websiteUrl);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => { fetchPrimaryPokemonData(); }, []);

    return (toolDescription != "" ? (
        <div style={tooldetailscontainer}>
            <div style={toolImage}><img style={{width:"100%"}}src={imgUrl} /></div>
            <div style={toolSideColumn}>
                <div>{toolDescription}</div>
                <div style={{paddingTop:"5%"}}>
                    <a href={websiteUrl} target="_blank">Visit Tool Homepage</a>
                </div>
            </div>
        </div>
    ) :
        (
            <CircularProgress
                color={"success"}
                size={200}
            />
        )
    );
}

export default ToolDetails;