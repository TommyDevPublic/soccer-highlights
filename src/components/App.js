import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home';
import VideoPlayer from './VideoPlayer';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

class App extends React.Component {

    render() {

        return (

            <Router>
                <div>
                    <Route path="/" render={(props) => (
                        <div>
                            <Home {...props}/>
                        </div> )
                    } exact />
                    <Route path="/soccer/videos/:date/:id/:title/:relatedId" render={(props) => (
                        <div>
                            <Home {...props}/>
                            <VideoPlayer {...props}/>
                        </div> )
                    } exact />



                </div>
            </Router>
        )

    }



};



export default App;