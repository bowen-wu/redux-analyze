import {call, put, takeEvery, select, take, takeLatest} from 'redux-saga/effects';

const sleep = (duration, params) => new Promise((resolve) => setTimeout(resolve, duration, params));

const Api = {
  childBorned: async () => {
    return await sleep(2000, {data: {name: 'George', age: 1}});
  },
  growed: async params => {
    return await sleep(2000, {data: params + 1});
  }
};

function* childWillBorn(action) {
  try {
    const state = yield select();
    if (state.userInfo.name) {
      throw new Error('Had Child!');
    } else {
      const {data: child} = yield call(Api.childBorned);
      yield put({type: 'CHILD_BORNED', payload: child});
    }
  } catch (e) {
    alert(e.message);
  }
}

function* childGrow(action) {
  try {
    const state = yield select();
    if (state.userInfo.name) {
      const {data: age} = yield call(Api.growed, action.payload);
      yield put({type: 'GROWED', payload: age});
    } else {
      throw new Error('No Child!');
    }
  } catch (e) {
    alert(e.message);
  }
}

function* logger(action) {
  const state = yield select();

  console.log('action -> ', action);
  console.log('state after -> ', state);
}


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* childSaga() {
  yield takeLatest('CHILD_WILL_BORN', childWillBorn);
  yield takeLatest('CHILD_GROW', childGrow);


}

function* congratulationSaga() {
  while (true) {
    const action = yield take('CHILD_GROW');
    const state = yield select();
    console.log('Grow', action, state.userInfo);
    if (state.userInfo.age && state.userInfo.age > 17) {
      break;
    }
  }
  console.log('stop listener');
  yield put({type: 'SHOW_CONGRATULATION'});
  // 终止，之后将不再进行监听
}

function* watchAndLog() {
  // yield takeEvery('*', logger)
  while (true) {
    const action = yield take('*');
    const state = yield select();

    // console.log('action -> ', action);
    // console.log('state after -> ', state);
  }
}

export {childSaga, watchAndLog, congratulationSaga};
