const reducers = (state, action) => {
  console.log('state -> ', state);
  switch (action.type) {
    case 'updateUserName':
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

export default reducers;
