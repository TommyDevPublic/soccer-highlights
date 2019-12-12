import React from 'react';
import _ from 'lodash';
import moment from 'moment';

class VideoList extends React.Component {

    state = {
        videos: [],
        filteredVideos: []
    };

    componentDidUpdate(prevProps,prevState) {

        console.log(this.props.videos);
        console.log('sdfsdf', prevProps);

        if (prevProps.videos.length <= 0 && this.props.videos.length > 0) {
            this.setState({videos: this.props.videos, filteredVideos: this.props.videos}, () => {
                console.log(this.state.videos)

            })
        }

        if (!_.isEqual(prevProps.search, this.props.search) ) {

            this.searchVideos();

        }


    }

    searchVideos = async () => {


        if ( _.isEmpty(this.props.search.date) && (_.isEmpty(this.props.search.terms)) ) {
            console.log('hell there');
           await this.setState({filteredVideos: this.state.videos});
           return
        }

        let fullText = false;

        if ( !_.isEmpty(this.props.search.terms) && !this.props.search.event && !this.props.search.title ) {
            fullText = true;
        }

        console.log('fullText', fullText);

        const searchTerms = this.props.search.terms ? this.props.search.terms.toLowerCase().split(' ') : [];

        console.log('search Params', searchTerms);

        //const videos = _.filter(this.state.videos, video => video.title.toLowerCase().includes(this.props.search.terms.toLowerCase()));
        const videos = [...this.props.videos];


        const filteredVideos = await videos.filter(video => {
            var hasTitle = false,
                hasDate = false,
                hasEvent = false;

            console.log('search as title marked',this.props.search.title);

            if ( this.props.search.title || fullText ) {
               hasTitle = searchTerms.some(term => video.title.toLowerCase().includes(term));
            }

            if ( this.props.search.event || fullText) {
                hasEvent = searchTerms.some(term => video.competition.name.toLowerCase().includes(term));
            }

            if ( this.props.search.date ) {
                let searchDate = moment(this.props.search.date).format('YYYY-MM-DD');
                console.log(searchDate);
                let videoDate = moment(video.date).format('YYYY-MM-DD');
                console.log(videoDate);
                hasDate = _.isEqual(searchDate, videoDate);
            }


            return (
                hasTitle || hasDate || hasEvent ? true : false
            )

        });

        console.log(filteredVideos);

        this.setState({filteredVideos: filteredVideos}, () => {
            console.log('new videos', videos);
        });


    };

    render() {

        if ( !this.props.videos.length > 0 ) {
            return 'Loading...'
        }

        console.log('search',this.props.search);
        return (
            <div className="video-list border p-4">
                {this.state.filteredVideos.map((video, i) => {
                    return (
                        <div className="video-item" key={i}>
                            <figure>
                                <img src={video.thumbnail} alt={`${video.title}`}/>
                            </figure>
                            <h6 className="title">{video.title}</h6>
                        </div>
                    )
                })
                }
            </div>

        )


    }



};

export default VideoList;

