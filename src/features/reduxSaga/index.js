import {useEffect, useState} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {childSaga, watchAndLog, congratulationSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

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

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'CHILD_BORNED':
      return {...action.payload};
    case 'GROWED':
      return {...state, age: action.payload};
    default:
      return state;
  }
};

const justAdult = (state = false, action) => action.type === 'SHOW_CONGRATULATION';

const rootReducer = combineReducers({todos, userInfo, justAdult});

const preloadState = {todos: [{id: 10341, text: 'init', completed: false}]};

const store = createStore(rootReducer, preloadState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAndLog);
sagaMiddleware.run(childSaga);
sagaMiddleware.run(congratulationSaga);

const ReduxSagaDemo = () => {
  return (
    <div>
      <h1>This is redux-saga demo.</h1>
      <FirstChild/>
      <SecondChild state={store}/>
    </div>
  );
};

const FirstChild = () => {
  const onBorn = () => {
    store.dispatch({type: 'CHILD_WILL_BORN'});
  };

  const onGrow = () => {
    store.dispatch({type: 'CHILD_GROW', payload: store.getState().userInfo.age});
  };

  return (
    <div className="child">
      <h1>First Child</h1>
      <button onClick={onBorn}>Born</button>
      <button onClick={onGrow}>Grow</button>
    </div>
  );
};

const SecondChild = (props) => {
  const [, setUpdate] = useState({});

  useEffect(() => {
    const unSubscribe = props.state.subscribe(() => {
      setUpdate({});
    });
    return () => {
      unSubscribe();
    };
  }, [props]);

  return (
    <div className="child">
      <h1>Second Child</h1>
      <div>Name: {props.state.getState().userInfo && props.state.getState().userInfo.name}</div>
      <div>Age: {props.state.getState().userInfo && props.state.getState().userInfo.age}</div>
      {props.state.getState().justAdult ? <div style={{color: 'red'}}>You are a Adult</div> : null}
    </div>
  );
};

export default ReduxSagaDemo;
