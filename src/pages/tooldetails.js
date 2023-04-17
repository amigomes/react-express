import {
    useParams,useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress,} from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    toolHeading : {
        fontWeight: 900,
        fontSize: "large",
    },
    detailscontainer: {
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        marginLeft: "15%",
        marginRight: "15%",
    },
    tooldetailscontainer: {
        display: "flex",
        alignItems: "center",
        flexFlow: "row",
        marginLeft: "25%",
        marginRight: "25%",
        flexGrow:0,
        flexShrink:0,
    }
})
const ToolDetails = () => {
    const classes = useStyles();
    // const { name } = useParams();
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
        <div className={classes.detailscontainer}>
            <a href={websiteUrl}><div className="toolHeading">{toolname}</div></a>
            <div className={classes.tooldetailscontainer}>
                <div className="imagebox"><img src={imgUrl}/></div>
                <div>{toolDescription}</div>
                <div>
                    {websiteUrl}
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