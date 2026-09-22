import { createContext, useReducer, useContext } from "react";
import todosRducer from "../reducesrs/todosRducers";
const initialState = { todos: [], history: [] };
const TodosContext = createContext([]);
const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosRducer, initialState);
  return (
    <TodosContext.Provider
      value={{
        todos: state.todos,
        history: state.history,
        dispatch,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
export default TodosProvider;
export const useTodos = () => {
  return useContext(TodosContext);
};
