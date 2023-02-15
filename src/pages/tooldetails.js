import {
    useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@mui/material";
import Box from '@mui/material/Box';
import './css/tooldetails.css';
import {
    CardMedia,
  } from "@material-ui/core";
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
    const { toolname } = useParams();
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
                        console.log(data);
                        settoolDescription(data.toolDescription);
                        console.log(toolDescription);
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