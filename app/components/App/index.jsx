import React, { useEffect } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getArticles } from '../../api';
import { fetchData } from '../../actions';
import Titles from '../../pages/Titles';
import Home from '../../pages/Home';

function App() {
    const dispatch = useDispatch();

    const getData = () => {
        return dispatchAction => {
            getArticles().then(res => dispatchAction(fetchData(res.data[0])));
        };
    };

    useEffect(() => {
        dispatch(getData());
    }, []);

    return (
        <Router>
            <main>
                <nav className="nav">
                    <ul className="navList">
                        <li className="listItem">
                            <NavLink activeClassName="activeLink" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="listItem">
                            <NavLink activeClassName="activeLink" to="/titles">
                                Titles
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Route path="/" exact component={Home} />
                <Route path="/titles" component={Titles} />
            </main>
        </Router>
    );
}

export default App;
