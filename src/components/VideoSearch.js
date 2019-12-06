import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';


Moment.locale('en');
momentLocalizer();

class VideoSearch extends React.Component {

    state = {
        searchCritieria: {
            searchTerm: '',
            date: new Date(),
            event: true,
            title: true
        }

    };

    /**
     * searchHandler is used to update the input field in the JSX.
     * After updating the term via setState we then use the callback
     * that setState allows to then search/filter the videos by term.
     * This get passed to the onSearchVideos prop passed from App.js
     *
     */
    searchHandler = (evt) => {
        const value = evt.target.value;
        const fieldName = evt.target.name;

        this.setState({[fieldName]: value })

    };

    onSearchVideos = () => {
      this.props.onSearchVideos(this.state.searchCritieria);
    };

    render() {

        return (
            <div className="video-search border p-4">
                <h4>Search Videos By:</h4>
                <div className="form-group">
                    <input type="checkbox" selected name="title" value={true} /> <label>Title</label>
                </div>
                <div className="form-group">
                    <input type="checkbox" selected name="event" value={true} /> <label>Event</label>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <DateTimePicker

                        onChange={value => this.setState({date: value})}
                        time={false}
                    />

                </div>
                <div className="form-group">
                    <label>
                        <i class="fas fa-asterisk"></i>
                        Search Terms/Keywords
                    </label>
                    <input className="form-control" type="text" name="terms" onChange={this.searchHandler} value={this.state.searchTerm} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.onSearchVideos}>Search Videos</button>
                </div>
            </div>

        )


    }

}

export default VideoSearch;
