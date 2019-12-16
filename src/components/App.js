import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home';
import VideoPlayer from './VideoPlayer';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../styles.css';

class App extends React.Component {

    render() {

        return (

            <Router >
                <div>
                    <Header />

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

                    <Footer />



                </div>
            </Router>
        )

    }



};



export default App;