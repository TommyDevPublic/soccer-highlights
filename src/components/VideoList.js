import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { fetchVideos, searchVideos, sortVideos } from "../actions/index";
import slugify from "slugify";
import PropTypes from "prop-types";

class VideoList extends React.Component {
  state = {
    filteredVideos: []
  };

  /**
   * When the react App component mounts
   * we then call the fetchVideos Action
   */
  componentDidMount() {
    if (_.isEmpty(this.props.videos)) {
      this.props.fetchVideos();
    }
    this.renderVideos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.videos.length <= 0 && this.props.videos.length > 0) {
      this.setState(
        { videos: this.props.videos, filteredVideos: this.props.videos },
        () => {
          this.renderVideos();
        }
      );
    }

    if (
      !_.isEqual(prevProps.searchVideosParams, this.props.searchVideosParams) ||
      !_.isEqual(prevProps.sortVideosBy, this.props.sortVideosBy)
    ) {
      this.renderVideos();
    }
  }

  sortVideos = async (videos, sortVideosBy) => {
    let sortOrder = "asc";

    if (!sortVideosBy) {
      sortVideosBy = "title";
    }

    if (sortVideosBy === "event") {
      sortVideosBy = "competition.name";
    }

    if (sortVideosBy === "date") {
      sortOrder = "desc";
    }

    const sortedVideos = await _.orderBy(videos, sortVideosBy, [sortOrder]);
    return sortedVideos;
  };

  renderVideos = async () => {
    // If search object is empty then return set filteredVideos to all videos
    if (
      !_.isDate(this.props.searchVideosParams.date) &&
      _.isEmpty(this.props.searchVideosParams.terms)
    ) {
      const sortedVideos = await this.sortVideos(
        this.props.videos,
        this.props.sortVideosBy ? this.props.sortVideosBy : "title"
      );
      this.setState({ filteredVideos: sortedVideos });
      return;
    }

    let fullText = false;

    // If search terms and the is option to search event and title is not provided we set fulltext search to true
    if (
      !_.isEmpty(this.props.searchVideosParams.terms) &&
      !this.props.searchVideosParams.event &&
      !this.props.searchVideosParams.title
    ) {
      fullText = true;
    }

    // Split the search terms into an array of search terms
    const searchTerms = this.props.searchVideosParams.terms
      ? this.props.searchVideosParams.terms.toLowerCase().split(" ")
      : [];

    // const videos = _.filter(this.state.videos, video => video.title.toLowerCase().includes(this.props.search.terms.toLowerCase()));
    const videos = [...this.props.videos];

    /* This is where videos are filtered based on search criteria.
            We use await to make sure fitlereVideos const is set before we set the local state of filteredVideos
         */
    const filteredVideos = await videos.filter(video => {
      var hasTitle = false;
      var hasDate = false;
      var hasEvent = false;

      if (this.props.searchVideosParams.title || fullText) {
        hasTitle = searchTerms.some(term =>
          video.title.toLowerCase().includes(term)
        );
      }

      if (this.props.searchVideosParams.event || fullText) {
        hasEvent = searchTerms.some(term =>
          video.competition.name.toLowerCase().includes(term)
        );
      }

      if (this.props.searchVideosParams.date) {
        const searchDate = moment(this.props.searchVideosParams.date).format(
          "YYYY-MM-DD"
        );
        const videoDate = moment(video.date).format("YYYY-MM-DD");
        hasDate = _.isEqual(searchDate, videoDate);
      }

      return !!(hasTitle || hasDate || hasEvent);
    });

    const sortedVideos = await this.sortVideos(
      filteredVideos,
      this.props.sortVideosBy
    );
    // After we gather out filteredVideos we set the local state
    this.setState({ filteredVideos: sortedVideos });
  };

  render() {
    if (_.isEmpty(this.props.videos)) {
      return "Loading...";
    }

    return (
      <div className="video-list border p-4">
        {!_.isEmpty(this.state.filteredVideos) ? (
          <div>
            {this.state.filteredVideos.map((video, i) => {
              return (
                <div className="video-item" key={i}>
                  <Link
                    to={`/soccer/videos/${moment(video.date).format(
                      "YYYY-MM-DD"
                    )}/${video.competition.id}/${slugify(
                      video.videos[0].title,
                      {
                        remove: /[*+~.()'"!:@]/g
                      }
                    )}/1`}
                  >
                    <figure>
                      <img src={video.thumbnail} alt={`${video.title}`} />
                    </figure>

                    <div className="metadata">
                      <h6 className="title">{video.title}</h6>
                      <div className="metadata-footer">
                        <div className="event">{video.competition.name}</div>
                        <div className="date">
                          {moment(video.date).format("YYYY-MM-DD")}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p>
            We\&apos;re sorry. There are no video hightlights for that search.
            Please try again.
          </p>
        )}
      </div>
    );
  }
}

VideoList.propTypes = {
  videos: PropTypes.object.isRequired,
  fetchVideos: PropTypes.func.isRequired,
  searchVideosParams: PropTypes.object,
  sortVideosBy: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    videos: Object.values(state.videos),
    searchVideosParams: state.searchVideos,
    sortVideosBy: state.sortVideos.value
  };
};

export default connect(mapStateToProps, {
  fetchVideos,
  searchVideos,
  sortVideos
})(VideoList);
