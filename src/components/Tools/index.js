import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  capitalize
} from "@material-ui/core";
import { CircularProgress, LinearProgress } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles({
  pokemonCardsArea: {
    paddingTop: "30px",
    paddingLeft: "15%",
    paddingRight: "15%",
    width: "100%"
  },
  pokemonImage: {
    height: "160px",
    width: "160px"
  },
  progress: {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginTop: "-100px",
    marginLeft: "-100px"
  },
  searchBar: {
    display: "flex",
    flexFlow: "row",
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: "1%"
  },
  cardContent: {
    padding: "0px",
  }
});

const Tools = () => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();

  // Search Term
  const [searchTerm,setsearchTerm] = useState('');

  // Setting up states for InfiniteScroll
  const [scrollData, setScrollData] = useState();
  const [hasMoreValue, setHasMoreValue] = useState(true);

  // When user is close enough to the bottom of the page, this function gonna be triggered
  // , new scrollData (data to be rendered) will be created
  const loadScrollData = async () => {
    try {
      setScrollData(pokemonData.slice(0, scrollData.length + 10));
    } catch (err) {
      console.log(err);
    }
  };

  // Handler function. Not only scrollData will be set up, but also hasMoreValue's value
  // Loader depends on it's value (show loader/ not show loader)
  const handleOnRowsScrollEnd = () => {
    if (scrollData.length < pokemonData.length) {
      setHasMoreValue(true);
      loadScrollData();
    } else {
      setHasMoreValue(false);
    }
  };

  const fetchPrimaryPokemonData = async () => {
    try {
      await axios
        .get("https://concerned-worm-handbag.cyclic.app/db")
        .then((response) => {
          const data = response.data.aitools;
          const newPokemonData = [];
          data.forEach((pokemon, index) => {
            newPokemonData.push({
              name: pokemon.toolName,
              imgUrl: "https://cdn.sanity.io/images/u0v1th4q/production/"+ pokemon.ImageUrl,
              websiteUrl: pokemon.websiteUrl
            });
          });
          setPokemonData(newPokemonData);
          // Let's set up primary array of items to render in InfiniteScroll
          setScrollData(newPokemonData.slice(0, 10));
        });
    } catch (err) {
      console.log(err);
    }
  };
  
  //https://concerned-worm-handbag.cyclic.app/aitools?toolName=Cody

  const searchPokemonData = async () => {
    try {
      if(searchTerm===""){
        fetchPrimaryPokemonData();
      }
      else
      {
      await axios
        .get("https://concerned-worm-handbag.cyclic.app/aitools?toolName="+searchTerm)
        .then((response) => {
          const data = response.data;
          const newPokemonData = [];
          data.forEach((pokemon, index) => {
            newPokemonData.push({
              name: pokemon.toolName,
              imgUrl: "https://cdn.sanity.io/images/u0v1th4q/production/"+ pokemon.ImageUrl,
              websiteUrl: pokemon.websiteUrl,
            });
          });
          setPokemonData(newPokemonData);
          // Let's set up primary array of items to render in InfiniteScroll
          setScrollData(newPokemonData.slice(0, 10));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrimaryPokemonData();
  }, []);

  const renderCards = (pokemonIndex) => {
    const { name, imgUrl, websiteUrl } = pokemonData[pokemonIndex];
    return (
      <Grid key={pokemonIndex} item xs={12} sm={6} md={4} lg={3}>
        <a href={"tooldetails/"+name}>
        <Card sx={{maxWidth:345}}>
          <CardContent align="center" className={classes.cardContent}>
            <Typography>{capitalize(`${name}`)}</Typography>
            <CardMedia style={{ height: "200px", paddingTop: "2%" }}
        image={imgUrl}
      />
          </CardContent>
        </Card>
        </a>
      </Grid>
    );
  };


  return (
    <>
      {scrollData ? (
        <>
          <InfiniteScroll
            dataLength={scrollData.length}
            next={handleOnRowsScrollEnd}
            hasMore={hasMoreValue}
            scrollThreshold={1}
            loader={<LinearProgress />}
            // Let's get rid of second scroll bar
            style={{ overflow: "unset" }}
          >
            <form className={classes.searchBar} onSubmit={(e) => {
              e.preventDefault();
              searchPokemonData();
            }}>
            <input icon='search'
                placeholder='Search...'
                onChange={(e)=>{
                  setsearchTerm(e.target.value);
                }}
            />
            <input type="button" value="search" onClick={(e) => {
                  searchPokemonData();
                }}/>
            </form>
            <Grid container spacing={4} className={classes.pokemonCardsArea}>
              {scrollData.map((pokemon, index) => renderCards(index))}
            </Grid>
          </InfiniteScroll>
        </>
      ) : (
        <CircularProgress
          color={"success"}
          className={classes.progress}
          size={200}
        />
      )}
    </>
  );
};

export default Tools;
