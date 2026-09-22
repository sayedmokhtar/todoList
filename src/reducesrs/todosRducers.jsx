import { v4 as uuidv4 } from "uuid";
export default function TodosReducer(currentState, action) {
  console.log("current state", currentState);
  console.log("action", action);
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payLoad.title,
        details: action.payLoad.details,
        isCompleted: false,
      };
      const updatedTodos = [...currentState.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return {
        todos: updatedTodos,
        history: currentState.history,
      };
    }
    case "deleted": {
      const deletedTods = currentState.todos.find((t) => {
        return t.id === action.payLoad.id;
      });
      const newTodos = currentState.todos.filter((t) => {
        return t.id !== action.payLoad.id;
      });
      const newHistory = [...currentState.history, deletedTods];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      localStorage.setItem("history", JSON.stringify(newHistory));
      return {
        todos: newTodos,
        history: newHistory,
      };
    }
    case "updated": {
      const newUpdatedTodo = currentState.todos.map((t) => {
        if (t.id == action.payLoad.id) {
          return {
            ...t,
            title: action.payLoad.title,
            details: action.payLoad.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(newUpdatedTodo));
      return {
        todos: newUpdatedTodo,
        history: currentState.history,
      };
    }

    case "checked": {
      const updatedTods = currentState.todos.map((t) => {
        if (t.id == action.payLoad) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTods));
      return {
        todos: updatedTods,
        history: currentState.history,
      };
    }

    case "get": {
      const todosData = localStorage.getItem("todos");
      const historyData = localStorage.getItem("history");
      const storageTodo = todosData ? JSON.parse(todosData) : [];
      const storageHistory = historyData ? JSON.parse(historyData) : [];
      return {
        todos: storageTodo,
        history: storageHistory,
      };
    }
    case "clear": {
      localStorage.removeItem("history");
      return { todos: currentState.todos, history: [] };
    }

    default: {
      throw Error("unknown action" + action.type);
    }
  }
}
