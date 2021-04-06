import React, {useContext, useEffect, useState} from 'react';
import shallowEqual from './utils';

export const store = {
  state: {user: {name: 'react', age: 18}},
  setState(newState) {
    store.state = newState;
    store.listener.map(callback => callback(newState));
  },
  listener: [],
  subscribe(callback) {
    store.listener.push(callback);
    return () => store.listener.splice(store.listener.indexOf(callback), 1);
  }
};

export const reducers = (state, action) => {
  switch (action.type) {
    case 'updateUserName':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      throw new Error('unknown Action Type');
  }
};

export const appContext = React.createContext(null);

export const connect = mapStateToProps => component => props => {
  console.log('store.listener -> ', store.listener);

  const appContextValue = useContext(appContext);
  const [, setUpdate] = useState({});
  const selectorState = typeof mapStateToProps === 'function' ? mapStateToProps(appContextValue.state) : appContextValue.state;

  useEffect(() => appContextValue.subscribe((newState) => {
    const newSelectorState = typeof mapStateToProps === 'function' ? mapStateToProps(newState) : newState;
    if (!shallowEqual(newSelectorState, selectorState)) {
      setUpdate({});
    }
  }), [appContextValue, selectorState]);

  const updateState = (action) => appContextValue.setState(reducers(appContextValue.state, action));

  return React.createElement(component, {updateState, ...selectorState}, props.children);
};
