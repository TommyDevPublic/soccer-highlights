import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchVideos} from "../actions/index";
import _ from 'lodash';
import ModalWrapper from './ModalWrapper';
import ReactHtmlParser from 'react-html-parser';



class VideoPlayer extends React.Component {


    state = {
        videoTitle: ''
    }

    /**
     * When the react App component mounts
     * we then call the fetchVideos Action
     */
    componentDidMount() {
        console.log('FETCH VIDEOS');
        if (_.isEmpty(this.props.videos)) {
            this.props.fetchVideos();
        }

    }

        renderContent = () => {

                console.log(this.props.videos)
                const video = _.find(this.props.videos, (v) => { return v.competition.id === parseInt(this.props.match.params.id)});

                console.log('VIDEO',video);
                return (


                    <div className="video-player-wrapper container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="video-player border">
                                    { _.isEmpty(video) ? (
                                        <div>
                                        <p>We're sorry the video you have requested could not be found.</p>
                                            <Link to="/">
                                                <button className="btn btn-primary">All Videos</button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>
                                            {ReactHtmlParser(video.videos[0].embed)}
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="related-videos">
                                    <h6>More Highlites</h6>
                                    <ul className="related-videos-list">
                                    { video.videos.length > 0 ? (

                                        video.videos.map((vid, i) => {
                                            return (
                                                <div key={`related-video-${i}`}>

                                                        <li>
                                                            <Link to={`/event/${video.competition.id}/video/title/`}>{vid.title}</Link>
                                                        </li>

                                                </div>
                                            )
                                        })
                                    ) : ('')}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                )

        };



        render() {

                if (_.isEmpty(this.props.videos) ) {
                        return <div>Loading...</div>

                }

                console.log('VIDEO PLAYER', this.props.videos);
           return (
               <div>
                       <ModalWrapper
                           content={this.renderContent()}
                           title='this is a cool video'
                       />
               </div>

           )

        }





};

const mapStateToProps = (state, ownProps) => {
    return {
        videos: Object.values(state.videos)
    }
};

export default connect(mapStateToProps, {fetchVideos})(VideoPlayer)
