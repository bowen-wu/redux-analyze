import React, {useEffect, useState} from 'react';
import {applyMiddleware, createStore} from 'redux';

/**
 * action
 */
let nextTodoId = 0;
const addTodo = text => ({
  type: 'ADD_TODO',
  payload: {
    id: nextTodoId++,
    text,
    completed: false
  }
});


/**
 * reducers
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat(action.payload);
    default:
      return state;
  }
};

/**
 * middleware
 */
function logger(store) {
  return next => action => {
    console.log('store -> ', store);
    console.log('will dispatch', action);

    // call the next dispatch method in the middleware chain
    const returnValue = next(action); // next -> dispatch -> return action
    console.log('returnValue -> ', returnValue);

    console.log('state after dispatch', store.getState());

    // This will likely be the action itself, unless a middleware further in chain changed it
    return returnValue;
  };
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));

const ApplyMiddlewareDemo = () => {
  const [, setUpdate] = useState({});

  useEffect(() => store.subscribe(() => setUpdate({})));

  const onDispatch = () => {
    store.dispatch({
      type: 'ADD_TODO',
      payload: '增加的 state'
    });
  };

  return (
    <div onClick={onDispatch}>
      <button>Add State</button>
      <div>Show Store</div>
      {store.getState().map(item => <div>{item}</div>)}
    </div>
  );
};

export default ApplyMiddlewareDemo;
