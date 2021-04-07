import React, {useContext, useEffect, useState} from 'react';
import shallowEqual from './utils';

export const createStore = (reducer, preloadedState) => {
  const state = preloadedState || null;
  const store = {
    state,
    reducer,
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
  return store;
};

export const appContext = React.createContext(null);

export const connect = (mapStateToProps, mapDispatchToProps) => component => props => {
  const {state, subscribe, reducer, setState} = useContext(appContext);
  const [, setUpdate] = useState({});
  const selectedState = typeof mapStateToProps === 'function' ? mapStateToProps(state) : state;

  useEffect(() => subscribe(newState => {
    const newSelectorState = typeof mapStateToProps === 'function' ? mapStateToProps(newState) : newState;
    if (!shallowEqual(newSelectorState, selectedState)) {
      setUpdate({});
    }
  }), [selectedState, subscribe]);

  const dispatch = action => setState(reducer(state, action));

  const dispatchers = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch) : {dispatch};

  return React.createElement(component, {...dispatchers, ...selectedState}, props.children);
};
