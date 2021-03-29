/**
 * redux + react-redux
 */
import React from 'react';
import {Provider, connect} from 'react-redux';
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

const ReduxAndReactRedux = () => {
  console.log('OriginalRedux store -> ', store);
  return (
    /**
     * Provider = ({ store, context, children }) => <Context.Provider value={contextValue}>{children}</Context.Provider>
     */
    <Provider store={store}>
      <FirstChild/>
      <SecondChild/>
    </Provider>
  );
};

const FirstChild = connect()(({dispatch}) => {
  let input;

  return (
    <div className='child'>
      <h1>First Child</h1>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }

        /**
         * dispatch
         */
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        <input ref={node => input = node}/>
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
});

const SecondChild = connect(state => state)((state) => {
  console.log('state -> ', state);
  return (
    <div className='child'>
      {state.todos.map(item => <li key={item.id}>{item.text}</li>)}
      <h1>Second Child</h1>
    </div>
  );
});

export default ReduxAndReactRedux;
