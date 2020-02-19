import React, {Component} from "react";

import {Grid} from "@material-ui/core";
import {SearchBar, VideoList, VideoDetail} from './components/index';
import youtube from "./api/youtube";

export default class App extends Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.handleSubmit('pdf generation with react and node')
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search',
      {
        params: {
          part: 'snippet',
          maxResults: 5,
          key: 'API KEY',
          q: searchTerm
        }
      });
    this.setState({videos: response.data.items, selectedVideo: response.data.items[0]})
  };

  onVideoSelect = (video) =>{
    this.setState({selectedVideo:video})
  };

  render() {
    return (
      <Grid container
            justify="center"
            spacing={10}>
        <Grid item
              xs={12}>
          <Grid container
                spacing={10}>
            <Grid item
                  xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item
                  xs={8}>
              <VideoDetail video={this.state.selectedVideo}/>
            </Grid>
            <Grid item
                  xs={4}>
              <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
