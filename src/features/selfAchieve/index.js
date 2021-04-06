import React, {useContext, useState} from 'react';
import {connect, appContext} from './redux';

const SelfAchieve = () => {
  const [appState, setAppState] = useState({user: {name: 'react', age: 18}});

  const contextValue = {appState, setAppState};
  return (
    <appContext.Provider value={contextValue}>
      <h1>Self Achieve</h1>
      <FirstChild/>
      <SecondChild/>
      <LastChild/>
    </appContext.Provider>
  );

};

const FirstChild = connect(({state}) => {
  console.log('state -> ', state);

  return (
    <div className='child'>
      <h1>First Child</h1>
      appState: {state.appState.user.name}
    </div>
  );
});

const SecondChild = connect(({updateState, state}) => {
  const onChange = (event) => {
    console.log('event -> ', event.target.value);
    updateState({
      type: 'updateUserName',
      payload: {name: event.target.value}
    });
  };

  return (
    <div className='child'>
      <h1>Second Child</h1>
      <input type="text" value={state.appState.user.name} onChange={onChange}/>
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
