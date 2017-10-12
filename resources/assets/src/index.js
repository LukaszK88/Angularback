import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-input-range/lib/css/index.css';
import 'react-dd-menu/dist/react-dd-menu.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createHistory from 'history/createBrowserHistory'
import Home from './components/home/home';
import TabsComp from './components/ranking/tabs';
import thunk from 'redux-thunk';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {currentUser} from './actions';
import Profile from './components/ranking/profile/profile';
import Events from './components/admin/events';
import AdminUsers from './components/admin/user/user';
import AdminClubs from './components/admin/club/club';
import ClubProfile from './components/clubs/clubProfile';
import ClubsRanking from './components/clubs/ranking/clubs';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

const createStoreWithMiddleware = createStore(reducers,
    composeWithDevTools(
        /* logger must be the last middleware in chain to log actions */
        applyMiddleware(thunk, promise)
    )
    // compose(applyMiddleware(thunk,promise),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);
injectTapEventPlugin();

const history = createHistory();

const muiTheme = getMuiTheme({
    palette: {
        textColor: '#000000',
        primary1Color: '#a2a2a2',
        pickerHeaderColor: '#000000'
    }
});
if(window.localStorage.getItem('token')) {
    setAuthorizationToken(window.localStorage.getItem('token'));
    createStoreWithMiddleware.dispatch(currentUser(window.localStorage.getItem('token')));
}

ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStoreWithMiddleware}>
        <BrowserRouter history={history}>
            <Switch>

                <Route path="/profile/:userId" component={Profile}/>
                <Route path="/club/:clubId" component={ClubProfile}/>
                <Route path="/events" component={Events}/>
                <Route path="/users" component={AdminUsers}/>
                <Route path="/clubs-admin" component={AdminClubs}/>
                <Route path="/ranking-clubs" component={ClubsRanking}/>
                <Route path="/ranking" component={TabsComp} />
                <Redirect from="/" to="/ranking"/>
                <Route path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    </Provider>
</MuiThemeProvider>
  ,document.getElementById('root'));
registerServiceWorker();
