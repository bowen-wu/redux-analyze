import React from 'react';
import {connect, appContext, store} from './redux';

const SelfAchieve = () => {
  return (
    <appContext.Provider value={store}>
      <h1>Self Achieve</h1>
      <FirstChild/>
      <SecondChild/>
      <ThirdChild/>
      <LastChild/>
    </appContext.Provider>
  );

};

const FirstChild = connect(state => ({user: state.user}))(({user}) => {
  return (
    <div className='child'>
      <h1>First Child</h1>
      appState: {user.name}
    </div>
  );
});

const SecondChild = connect()(({updateState, user}) => {
  const onChange = (event) => {
    updateState({
      type: 'updateUserName',
      payload: {name: event.target.value}
    });
  };

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
