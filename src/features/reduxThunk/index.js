/**
 * redux-thunk -> 利用 redux 中间件让 redux 支持异步 action
 */
import {useEffect, useState} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import thunk from 'redux-thunk';

const thunk = ({dispatch, getState}) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};

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

const rootReducer = combineReducers({todos});

const store = createStore(rootReducer, {todos: [{id: 10341, text: 'init', completed: false}]}, applyMiddleware(thunk));

const ReduxThunkDemo = () => {
  return (
    <div>
      <h1>Thid is redux-thunk demo.</h1>
      <FirstChild/>
      <SecondChild state={store}/>
    </div>
  );
};

const FirstChild = () => {
  const onChangeStore = () => {
    store.dispatch(dispatch => setTimeout(() => dispatch(addTodo('手动增加 TODO!')), 3000));
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

export default ReduxThunkDemo;
