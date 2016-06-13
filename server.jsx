import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import promiseMiddleware from 'lib/promiseMiddleware';
import fetchComponentData from 'lib/fetchComponentData';


const app = express();

app.use((req, res) => {

    console.log(req.url);
    const location = createLocation(req.url);
    const reducer = combineReducers(reducers);
    //const store = createStore(reducer);
    const store = applyMiddleware(promiseMiddleware)createStore(reducer);
    const initialState = store.getState();
    
    
    console.log(location);
    match({ routes, location}, (err, redirectLocation, renderProps) => {
        
        console.log("routes :"+ JSON.stringify(routes) );
        console.log("location :"+JSON.stringify( location) );
        
        
        if(err){
            console.log(err);
            return res.status(500).end('Internal Server Error');
        }
        
        if(!renderProps) return res.status(404).end('Not found.');
        
        console.log("renderProps :"+ JSON.stringify(renderProps ));
        console.log("redirectLocation :"+JSON.stringify( redirectLocation ));
        
        
        const InitialComponent = (
            <Provider store={store}>
                <RoutingContext {...renderProps} />
            </Provider>
        );
        
        const componentHTML = renderToString(InitialComponent);
        
        console.log("componentHTML :"+ componentHTML );
        function renderView(){
            const HTML = `
            <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Isomorphic Redux Demo</title>
                   <script type="application/javascript">
                   window._INITIAL_STATE_ = ${JSON.stringify(initialState)};
                   </script>
                </head>
                <body>
                <div id="react-view">${componentHTML}</div>
                  <script type="application/javascript" src="/bundle.js"></script>
                </body>
              </html>
            `
        }
        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderView)
        .then(html => res.end(html))
        .catch(err => res.end(err.message));
        //res.end(HTML);
    });
});
export default app;