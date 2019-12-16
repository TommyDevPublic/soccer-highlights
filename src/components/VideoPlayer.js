import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchVideos} from "../actions/index";
import _ from 'lodash';
import ModalWrapper from './ModalWrapper';
import ReactHtmlParser from 'react-html-parser';
import slugify from 'slugify';
import moment from 'moment';



class VideoPlayer extends React.Component {


    state = {
        videoTitle: '',
    };

    /**
     * When the react App component mounts
     * we then call the fetchVideos Action
     */
    componentDidMount() {
        if (_.isEmpty(this.props.videos)) {
            this.props.fetchVideos();
        }

    }

    renderContent = () => {

        const relatedVideoId = parseInt(this.props.match.params.relatedId) - 1;

        const video =  _.find(this.props.videos, (v) => { return v.competition.id === parseInt(this.props.match.params.id)});

        const columnClass = () => {
          if (video.videos.length <= 1) {
              return 'col-lg-12'
          }  else {
              return 'col-lg-9'
          }
        };


            return (


                <div className="video-player-wrapper container">
                    <div className="row">
                        <div className={columnClass()}>
                            <div className="video-player">
                                { _.isEmpty(video.videos[relatedVideoId]) ? (
                                    <div>
                                    <p>We're sorry the video you have requested could not be found.</p>
                                        <Link to="/">
                                            <button className="btn btn-primary">All Videos</button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <h5>{video.videos[relatedVideoId].title}</h5>
                                        {ReactHtmlParser(video.videos[relatedVideoId].embed)}
                                    </div>
                                )}

                            </div>
                        </div>
                        { video.videos.length > 1 ? (
                            <div className="col-lg-3">
                                <div className="related-videos">
                                    <h6>More Highlights</h6>
                                    <ul className="related-videos-list">
                                        {

                                            video.videos.map((vid, i) => {
                                                return (
                                                    <div key={`related-video-${i}`}>

                                                        <li>
                                                            { (i+1) === parseInt(this.props.match.params.relatedId) ? (
                                                                    <span>
                                                                        <i class="fas fa-video mr-1"></i>
                                                                        {vid.title}
                                                                    </span>
                                                                ) : (
                                                                    <Link to={`/soccer/videos/${ moment(video.date).format('YYYY-MM-DD')}/${video.competition.id}/${slugify(vid.title, {remove: /[*+~.()'"!:@]/g})}/${i + 1}`}>
                                                                        {vid.title}
                                                                    </Link>
                                                                )}
                                                        </li>

                                                    </div>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                            ) : ''}

                    </div>

                </div>
            )

    };



        render() {

                if (_.isEmpty(this.props.videos) ) {
                        return <div>Loading...</div>

                }

           return (
               <div>
                       <ModalWrapper
                           content={this.renderContent()}
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
