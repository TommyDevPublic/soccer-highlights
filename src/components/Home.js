import React from 'react';
import {connect} from 'react-redux';
import {fetchVideos} from "../actions/index";
import VideoList from './VideoList';
import VideoSearch from './VideoSearch';

class App extends React.Component {

    state = {
        search: null
    };

    /**
     * When the react App component mounts
     * we then call the fetchVideos Action
     */
    componentDidMount() {
        this.props.fetchVideos();
    }

    onSearchVideos = (formValues) => {
        const values = {...formValues};
        this.setState({search: values});
    };

    onClearSearch = () => {
        this.setState({search: {}})
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
                    <div className="col-lg-2">
                        <VideoSearch onClearSearch={this.onClearSearch} onSearchVideos={this.onSearchVideos}/>
                    </div>
                    <div className="col-lg-10">
                        <VideoList search={{...this.state.search}} videos={[...this.props.videos]}/>
                    </div>
                </div>

            </div>
        )


    }



};

const mapStateToProps = (state, ownProps) => {
    return {
        videos: Object.values(state.videos)
    }
};

export default connect(mapStateToProps, {fetchVideos})(App)