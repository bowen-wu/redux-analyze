import React, {useState, useContext} from 'react';
import createNewState from './createNewState';

const appContext = React.createContext(null);

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

const FirstChild = () => {
  const appContextValue = useContext(appContext);
  console.log('appContextValue -> ', appContextValue);

  return (
    <div className='child'>
      <h1>First Child</h1>
      appState: {appContextValue.appState.user.name}
    </div>
  );
};

/**
 * updateState 获取不到 context
 * 也拿不到 appState + setAppState
 * 解决方案：在组件中可以获取 context + appState + setAppState
 */
const updateState = (action) => {
  appContextValue.setAppState(createNewState(appContextValue.appState, action));
};

const SecondChild = () => {
  const appContextValue = useContext(appContext);

  const onChange = (event) => {
    console.log('event -> ', event.target.value);
    /**
     * 每次更新数据都需要写
     * appContextValue.serAppState(createNewState(appContextValue.appState, action);
     * 提取公共的 -> updateState
     */
    updateState({
      type: 'updateUserName',
      payload: {name: event.target.value}
    });
  };

  return (
    <div className='child'>
      <h1>Second Child</h1>
      <input type="text" value={appContextValue.appState.user.name} onChange={onChange}/>
    </div>
  );
};

const LastChild = () => {
  return (
    <div className='child'>
      <h1>Last Child</h1>
    </div>
  );
};

export default SelfAchieve;
