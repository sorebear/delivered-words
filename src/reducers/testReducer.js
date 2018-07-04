const DEFAULT_STATE = { test: 'redux is working!' }

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
}