/**
 * redux
 */
import React, {useEffect, useState} from 'react';
import {createStore, combineReducers, compose} from 'redux';
import ApplyMiddlewareDemo from './applyMiddleware';

const add = (a, b) => a + b;
const square = n => n * n;
const increase = n => n + 1;
console.log('compose() -> ', compose());
const addSquare = compose(increase, square, add);
const value = addSquare(1, 2);
console.log('value -> ', value);

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


const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat(action.payload);
    default:
      return state;
  }
};

/**
 * reducer = (state, action) => state;
 */
// const rootReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           {
//             id: action.id,
//             text: action.text,
//             completed: false
//           }]
//       };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({todos});

console.log('类型：', typeof rootReducer);

console.log('rootReducer -> ', rootReducer);

/**
 * store = { dispatch, subscribe, getState, replaceReducer, [$$observable]: observable }
 */
// const store = createStore(rootReducer, {todos: [{id: 10341, text: 'init', completed: false}]});
const store = createStore(rootReducer, {todos: [{id: 10341, text: 'init', completed: false}]});
console.log('store -> ', store);

const OriginalRedux = () => {
  console.log('OriginalRedux store -> ', store);
  return (
    <div>
      <FirstChild/>
      <SecondChild state={store}/>

      <ApplyMiddlewareDemo/>

    </div>
  );
};

const FirstChild = () => {
  const onChangeStore = () => {
    store.dispatch(addTodo('手动更改 Store'));
  };

  return (
    <div className="child">
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
    <div className="child">
      <h1>Second Child</h1>
      {props.state.getState().todos && props.state.getState().todos.map(item => <li key={item.id}>{item.text}</li>)}
    </div>
  );
};
export default OriginalRedux;
