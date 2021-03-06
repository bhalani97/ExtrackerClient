import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import rootReducer from "./appRedux/store";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// import { composeWithDevTools } from 'redux-devtools-extension';
const persistConfig = {
  key: 'root',
  storage: storage,
   // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);
 const persistor = persistStore(store)
ReactDOM.render(
  <Provider store={store}>
  
    <App />
  
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
