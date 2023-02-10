import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import cardRow from "./cardRow";
import "./tools.css";

export default class Tools extends Component {
  state = {
    url: "https://concerned-worm-handbag.cyclic.app/db",
    aitool: [],
    itemsCountPerPage: 20,
    activePage: 1
  };

  loadAitool = () => {
    axios
      .get(this.state.url)
      .then(res => {
        this.setState(prevState => {
          const aitools = prevState.aitool;
          const nextPage = prevState.activePage+1;
          const nextPageurl = this.state.url + "?_page=" + nextPage.toString() + "&_limit=" + this.state.itemsCountPerPage.toString();
          return {
            aitool: [...prevState.aitool, ...res.data.aitools],
            url: nextPageurl,
            activePage: nextPage,
          };
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  render() {
    // console.log(this.state.pokemon);
    return (
      <React.Fragment>
        {this.state.aitool ? (
          <div className="tools-container">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadAitool}
              hasMore={this.state.url}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.state.aitool.map((aitool, i) => (
                <cardRow/>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <h1>Loading AiTool</h1>
        )}
      </React.Fragment>
    );
  }
}