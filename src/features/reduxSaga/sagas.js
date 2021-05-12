import {call, put, takeEvery} from 'redux-saga/effects';

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
    // 此处也可以使用 yield delay(1000);
    const {data: child} = yield call(Api.childBorned);
    yield put({type: 'CHILD_BORNED', payload: child});
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  }
}

function* childGrow(action) {
  try {
    const {data: age} = yield call(Api.growed, action.payload);
    yield put({type: 'GROWED', payload: age});
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery('CHILD_WILL_BORN', childWillBorn);
  yield takeEvery('CHILD_GROW', childGrow);
}

export default mySaga;
