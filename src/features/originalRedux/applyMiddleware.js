import React, {useEffect, useState} from 'react';
import {applyMiddleware, createStore} from 'redux';

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
    console.log('******* logger middleware ********');
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

function verification(store) {
  return next => action => {
    console.log('******* verification middleware ********');
    console.log('store -> ', store);
    console.log('will dispatch', action);

    const returnValue = next(action);
    console.log('returnValue -> ', returnValue);

    console.log('state after dispatch -> verification', store.getState());
    return returnValue
  }
}

const store = createStore(todos, ['init State'], applyMiddleware(logger));

const multipleMiddlewareStore = createStore(todos, ['multiple Middleware init state'], applyMiddleware(logger, verification));

const ApplyMiddlewareDemo = () => {
  const [, setUpdate] = useState({});

  useEffect(() => {
    const storeUnsubscribe = store.subscribe(() => setUpdate({}));
    const multipleMiddlewareStoreUnsubscribe = multipleMiddlewareStore.subscribe(() => setUpdate({}));

    return () => {
      storeUnsubscribe();
      multipleMiddlewareStoreUnsubscribe();
    }
  });

  const onDispatch = () => {
    store.dispatch({
      type: 'ADD_TODO',
      payload: '增加的 state'
    });
  };

  const onMultipleDispatch = () => {
    multipleMiddlewareStore.dispatch({
      type: 'ADD_TODO',
      payload: '增加的 state'
    });
  }

  return (
    <div>

      <div className='divide'>Next use single Middleware</div>
      <button onClick={onDispatch}>Add State</button>
      <div>Show Store</div>
      {store.getState().map(item => <div>{item}</div>)}

      <div className='divide'>Next use Middleware[]</div>
      <button onClick={onMultipleDispatch}>Add State</button>
      <div>Show Store</div>
      {multipleMiddlewareStore.getState().map(item => <div>{item}</div>)}

    </div>
  );
};

export default ApplyMiddlewareDemo;
