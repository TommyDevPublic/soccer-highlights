import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { searchVideos, clearSearch, sortVideos } from "../actions/index";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import { DropdownList } from "react-widgets";
import PropTypes from "prop-types";

Moment.locale("en");
momentLocalizer();

class VideoSearch extends React.Component {
  /**
   * Searches Videos by filtering
   * videos array.  This method is passed via props to the VideoSearch Component.
   * It then gets called from the VideoSearch component when user enter text into field.
   */
  onSearchVideos = formValues => {
    this.props.searchVideos(formValues);
  };

  onClearSearch = () => {
    this.props.clearSearch();
  };

  renderDateTimePicker = ({ input: { onChange, value } }) => {
    return (
      <div className="field-date">
        <DateTimePicker onChange={onChange} format="YYYY-MM-DD" time={false} />
      </div>
    );
  };

  sortVideos = value => {
    this.props.sortVideos(value);
  };

  render() {
    const { reset } = this.props;
    const resetForm = async () => {
      reset();
      this.onClearSearch();
    };

    const sortOptions = [
      { name: "Title", value: "title" },
      { name: "Event/League", value: "event" },
      { name: "Date", value: "date" }
    ];

    return (
      <div className="video-search border p-4 mb-4">
        <h5>Sort Videos</h5>
        <DropdownList
          data={sortOptions}
          defaultValue={"title"}
          valueField="value"
          textField="name"
          onChange={value => this.sortVideos(value)}
        />

        <h5 className="mb-4 mt-4">Search Videos</h5>

        <div id="search-videos">
          <form
            onSubmit={this.props.handleSubmit(this.onSearchVideos)}
            className="ui form error"
          >
            <div className="form-group checkbox">
              <Field name="title" component="input" type="checkbox" />
              <label className="ml-2">Title</label>
            </div>
            <div className="form-group checkbox">
              <Field name="event" component="input" type="checkbox" />
              <label className="ml-2">Event/League</label>
            </div>
            <div className="form-group">
              <label>Date</label>
              <Field component={this.renderDateTimePicker} name="date" />
            </div>
            <div className="form-group">
              <label>Search Terms/Keywords</label>
              <Field
                name="terms"
                component="input"
                type="text"
                placeholder="Enter search terms/keywords"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Search Videos
              </button>
            </div>
            <div className="form-group">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-default"
              >
                Show All Videos
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

VideoSearch.propTypes = {
  searchVideos: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  sortVideos: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    searchVideosParams: state.searchVideos
  };
};

export default connect(mapStateToProps, {
  searchVideos,
  clearSearch,
  sortVideos
})(
  reduxForm({
    form: "video-search"
  })(VideoSearch)
);
