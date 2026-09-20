import { v4 as uuidv4 } from "uuid";
export default function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payLoad.title,
        details: action.payLoad.details,
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const newUpdatedTodo = currentTodos.filter((t) => {
        return t.id != action.payLoad.id;
      });
      localStorage.setItem("todos", JSON.stringify(newUpdatedTodo));
      return newUpdatedTodo;
    }
    case "updated": {
      const newUpdatedTodo = currentTodos.map((t) => {
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
      return newUpdatedTodo;
    }
    case "get": {
      const storageTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodo;
    }

    default: {
      throw Error("unknown action" + action.type);
    }
  }
}
