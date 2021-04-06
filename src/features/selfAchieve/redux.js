import React, {useContext} from 'react';
import reducers from './reducers';

export const store = {
  state: {user: {name: 'react', age: 18}},
  setState(newState) {
    store.state = newState;
  }
}

export const appContext = React.createContext(null);

export const connect = component => props => {
  const appContextValue = useContext(appContext);

  const updateState = (action) => {
    console.log(action);
    appContextValue.setState(reducers(appContextValue.state, action));
  };

  return React.createElement(component, {updateState, state: appContextValue.state}, props.children);
};
