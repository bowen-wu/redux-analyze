import React from 'react';
import {Counter} from './features/counter/Counter';
import SelfAchieve from './features/selfAchieve';
import OriginalRedux from './features/originalRedux';
import ReduxThunkDemo from './features/reduxThunk';
import ReduxSagaDemo from './features/reduxSaga';
import './App.css';

function App() {
  return (
    <div className="App">
      {/*<Counter/>*/}
      {/*<SelfAchieve/>*/}

      <div className="divide">divide</div>

      {/*<OriginalRedux/>*/}

      {/*<ReduxThunkDemo/>*/}

      <ReduxSagaDemo/>
    </div>
  );
}

export default App;
