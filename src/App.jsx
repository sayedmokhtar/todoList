import ToDoList from "./components/ToDoList";
import { ToastProvider } from "./contexts/ToastContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Myfont",
  },
});
import TodosProvider from "./contexts/TodosContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App">
            <ToDoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
