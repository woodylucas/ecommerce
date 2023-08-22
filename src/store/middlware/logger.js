export const loggerMiddleware = (store) => (next) => (action) => {
  // Middleware entry point
  if (!action.type) {
    return next(action); // If the action doesn't have a type, continue with the next middleware
  }

  // Log information before processing the action
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  // Continue with the next middleware or reducer
  next(action);

  // Log information after processing the action
  console.log("next state: ", store.getState());
};
