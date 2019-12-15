import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {searchVideos, clearSearch, sortVideos} from "../actions/index";
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import { DropdownList } from 'react-widgets'

Moment.locale('en');
momentLocalizer();

class VideoSearch extends React.Component {

    /**
     * Searches Videos by filtering
     * videos array.  This method is passed via props to the VideoSearch Component.
     * It then gets called from the VideoSearch component when user enter text into field.
     */
    onSearchVideos = (formValues) => {
        this.props.searchVideos(formValues);
    };

    onClearSearch = () => {
      console.log('clear search');
      this.props.clearSearch();
    };

    renderDateTimePicker = ({ input: { onChange, value }}) => {
        return (
            <div className="field-date">
                <DateTimePicker
                    onChange={onChange}
                    format="YYYY-MM-DD"
                    time={false}
                />

            </div>

        )
    };

    sortVideos = (value) => {
        this.props.sortVideos(value);
    };

    render() {
        const { reset } = this.props;
        const resetForm = async () => {
              reset();
              this.onClearSearch();

        };

        const sortOptions = [
            {name: 'Title', value: 'title'},
            {name: 'Event/League', value: 'event'},
            {name: 'Date', value: 'date'}
        ];

        return (
            <div className="video-search border p-4">

                <DropdownList data={sortOptions} defaultValue={"title"} valueField="value" textField="name" onChange={value => this.sortVideos(value)}/>
                <h5 className="mb-4 text-center">
                    <a href="#search-videos" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="search-videos">Search Videos</a>
                </h5>
                <div className="collapse" id="search-videos">
                    <form onSubmit={this.props.handleSubmit(this.onSearchVideos)} className="ui form error">
                        <div className="form-group checkbox">
                            <Field name="title" component="input" type="checkbox"/>
                            <label className="ml-2">Title</label>
                        </div>
                        <div className="form-group checkbox">
                            <Field name="event" component="input"  type="checkbox"/>
                            <label className="ml-2">Event/Country/City</label>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <Field component={this.renderDateTimePicker} name="date" />
                        </div>
                        <div className="form-group">
                            <label>
                                <i className="fas fa-asterisk"></i>
                                Search Terms/Keywords
                            </label>
                            <Field name="terms" component="input" type="text" placeholder="Enter search terms/keywords"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Search Videos</button>
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={resetForm} className="btn btn-default">Show All Videos</button>
                        </div>
                    </form>
                </div>

            </div>

        )


    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        searchVideosParams: state.searchVideos
    }
};


export default connect(mapStateToProps, {searchVideos, clearSearch, sortVideos})(
    reduxForm({
        form: 'video-search'
    })(VideoSearch));
