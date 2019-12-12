import React from 'react';
import { Field, reduxForm, reset, reducer as forms } from 'redux-form';
import {connect} from 'react-redux';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';


Moment.locale('en');
momentLocalizer();

class VideoSearch extends React.Component {

    /**
     * Searches Videos by filtering
     * videos array.  This method is passed via props to the VideoSearch Component.
     * It then gets called from the VideoSearch component when user enter text into field.
     */
    onSearchVideos = (formValues) => {
        this.props.onSearchVideos(formValues);
    };

    onClearSearch = () => {
      this.props.onClearSearch();
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

    render() {

        const { reset } = this.props;

        const resetForm = async () => {
              reset();
              this.props.onClearSearch();

        };
        return (
            <div className="video-search border p-4">
                <h4 className="mb-4 text-center">Search Videos</h4>
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

        )


    }

}

export default reduxForm({
    form: 'video-search'
})(VideoSearch);

