import React, {useContext} from 'react';
import reducers from './reducers';

export const appContext = React.createContext(null);

export const connect = component => props => {
  const appContextValue = useContext(appContext);

  const updateState = (action) => {
    appContextValue.setAppState(reducers(appContextValue.appState, action));
  };

  return React.createElement(component, {updateState, state: appContextValue}, props.children);
};
