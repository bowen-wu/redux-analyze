/**
 * redux
 */
import React, {useEffect, useState} from 'react';
import {createStore} from 'redux';

/**
 * action
 */
let nextTodoId = 0;
const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

/**
 * reducer = (state, action) => state;
 */
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }]
      };
    default:
      return state;
  }
};
console.log('rootReducer -> ', rootReducer);

/**
 * store = { dispatch, subscribe, getState, replaceReducer, [$$observable]: observable }
 */
const store = createStore(rootReducer, {todos: [{id: 10341, text: 'init', completed: false}]});
console.log('store -> ', store);

const OriginalRedux = () => {
  console.log('OriginalRedux store -> ', store);
  return (
    <div>
      <FirstChild/>
      <SecondChild state={store}/>
    </div>
  );
};

const FirstChild = () => {
  const onChangeStore = () => {
    store.dispatch(addTodo('手动更改 Store'));
  };

  return (
    <div className='child'>
      <h1>First Child</h1>
      <button onClick={onChangeStore}>更改 Store</button>
    </div>
  );
};

const SecondChild = (props) => {
  const [, setUpdate] = useState({});

  useEffect(() => {
    const unSubscribe = props.state.subscribe(() => setUpdate({}));
    return () => {
      unSubscribe();
    };
  }, [props]);

  return (
    <div className='child'>
      <h1>Second Child</h1>
      {props.state.getState().todos && props.state.getState().todos.map(item => <li key={item.id}>{item.text}</li>)}
    </div>
  );
};
export default OriginalRedux;
