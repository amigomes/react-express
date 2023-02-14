import {
    useParams,
  } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    Typography,
    CardContent,
    CardMedia,
    capitalize
  } from "@material-ui/core";

const ToolDetails = () =>{
const { toolName} = useParams();
// const {toolDescription,settoolDescription} = useState("");
// const {imgUrl,setimgUrl} = useState("");
// const {websiteUrl,setwebsiteUrl} = useState("");

// const fetchPrimaryPokemonData = async () => {
// try {
//     if(toolName){
//     await axios
//     .get("https://concerned-worm-handbag.cyclic.app/aitools?toolName="+toolName)
//     .then((response) => {
//         console.log("")
//         const data = response.data[0];
//         settoolDescription(data.toolDescription);
//         setimgUrl("https://cdn.sanity.io/images/u0v1th4q/production/"+ data.imgUrl);
//         setwebsiteUrl(data.websiteUrl);
//     });
// }
// } catch (err) {
//     console.log(err);
// }
// };
// useEffect(()=>{fetchPrimaryPokemonData();},[toolName]);

    return (<div className="detailscontainer">
        <div>
        {toolName}
        </div>
    </div>);
}

export default ToolDetails;