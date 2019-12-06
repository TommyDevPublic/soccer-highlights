import React from 'react';
import VideoList from './VideoList';
import VideoSearch from './VideoSearch';
import sportbat from '../apis/sportbat.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

class App extends React.Component {

    state = {
        videos: []
    };

    /**
     * When the react App component mounts
     * we then call the fetchVideos method
     */
    componentDidMount() {
        this.fetchVideos();
    }

    /**
     * Async method to retrieve video data
     * we then fetch the videos from sportbat API
     */
    fetchVideos = async () => {
        const response = await sportbat.get();



        // After receiving the response we update the state for videos
        this.setState({videos: response.data})
    };

    /**
     * Searches Videos by filtering
     * videos array.  This method is passed via props to the VideoSearch Component.
     * It then gets called from the VideoSearch component when user enter text into field.
     */
    searchVideos = (term) => {
      console.log(term);
    };

    render() {

        return (
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-12 text-center p-4">
                        <h1>Video Highlights from around The World</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <VideoSearch onSearchVideos={this.searchVideos} />
                    </div>
                    <div className="col-lg-8">
                        <VideoList videos={this.state.videos} />
                    </div>
                </div>

            </div>
        )


    }



};

export default App;