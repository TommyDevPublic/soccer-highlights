import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home';
import VideoPlayer from './VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

class App extends React.Component {

    render() {

        return (
            <Router>
                <div>
                    <Route path="/" component={Home} exact />
                    <Route path="/event/:id/video/:title" component={VideoPlayer} exact/>
                </div>
            </Router>
        )

    }



};



export default App;