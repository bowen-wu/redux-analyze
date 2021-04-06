import React, {useContext, useEffect, useState} from 'react';

export const store = {
  state: {user: {name: 'react', age: 18}},
  setState(newState) {
    store.state = newState;
    store.listener.map(callback => callback());
  },
  listener: [],
  subscribe(callback) {
    store.listener.push(callback);
  }
}

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

export const connect = component => props => {
  const appContextValue = useContext(appContext);
  const [, setUpdate] = useState({});

  useEffect(() => {
    appContextValue.subscribe(() => setUpdate({}));
  }, [appContextValue]);

  const updateState = (action) => {
    appContextValue.setState(reducers(appContextValue.state, action));
  };

  return React.createElement(component, {updateState, state: appContextValue.state}, props.children);
};
