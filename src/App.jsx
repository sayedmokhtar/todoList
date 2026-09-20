import ToDoList from "./components/ToDoList";
import { ToastProvider } from "./contexts/ToastContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Myfont",
  },
});
import { TodosContext } from "./contexts/TodosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const initial = [
  {
    id: uuidv4(),
    title: "قراة كتاب",
    details: "متاخر شوية فى القراة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "لعب كورة",
    details: "الساعة 8 فى مدينة نصر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "عيد ميلاد",
    details: "احمد الساعة 10 فى المقطم",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initial);
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div className="App">
          <TodosContext.Provider value={{ todos, setTodos }}>
            <ToDoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
