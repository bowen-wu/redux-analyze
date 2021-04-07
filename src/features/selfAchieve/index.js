import React from 'react';
import {connect, Provider, createStore} from './redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateUser':
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

const initState = {user: {name: 'react', age: 18}};

const store = createStore(reducer, initState);

const SelfAchieve = () => {
  return (
    <Provider store={store}>
      <h1>Self Achieve</h1>
      <FirstChild/>
      <SecondChild/>
      <ThirdChild/>
      <LastChild/>
    </Provider>
  );
};

const mapStateToProps = state => ({user: state.user});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: payload => dispatch({type: 'updateUser', payload})
  };
};

const FirstChild = connect(mapStateToProps)(({user}) => {
  return (
    <div className='child'>
      <h1>First Child</h1>
      appState: {user.name}
    </div>
  );
});

const SecondChild = connect(mapStateToProps, mapDispatchToProps)(({updateUser, user}) => {
  const onChange = event => updateUser({name: event.target.value});

  return (
    <div className='child'>
      <h1>Second Child</h1>
      <input type="text" value={user.name} onChange={onChange}/>
    </div>
  );
});

const ThirdChild = connect(() => ({}))(() => {
  console.log('ThirdChild render');
  return (
    <div className='child'>
      <h1>Third Child</h1>
    </div>
  );
});

const LastChild = () => {
  console.log('LastChild render');
  return (
    <div className='child'>
      <h1>Last Child</h1>
    </div>
  );
};

export default SelfAchieve;
