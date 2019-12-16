import React from "react";
import VideoList from "./VideoList";
import VideoSearch from "./VideoSearch";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-12 text-center mb-3">
            <h1>Video Highlights from around The World</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 ">
            <VideoSearch />
          </div>
          <div className="col-lg-9">
            <VideoList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
