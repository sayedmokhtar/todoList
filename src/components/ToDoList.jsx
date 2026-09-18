import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// component import
import Todo from "./Todo";
import { useState, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("");

  // conditional rendering
  const completedTods = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompleted = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todosToBeRendred;
  if (displayedTodosType == "completed") {
    todosToBeRendred = completedTods;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendred = notCompleted;
  } else {
    todosToBeRendred = todos;
  }

  const todojsx = todosToBeRendred.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  useEffect(() => {
    const storageTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodo);
  }, []);

  // event handler

  function changeDisplayedType(e, newVlue) {
    console.log(`${e}\n`);
    console.log(`${newVlue}\n`);
    console.log(typeof newVlue);
    setDisplayedTodosType(e.target.value);
  }
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    setDetailsInput("");
  }
  return (
    <Container className="Container">
      <Card
        className="w-full text-center md:w-1/2"
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography className=" text-purple-400 py-3 text-lg font-title font-extrabold">
            مهامى
          </Typography>
          <Divider />
          <ToggleButtonGroup
            exclusive
            value={displayedTodosType}
            className="direction-ltr mt-5 "
            onChange={changeDisplayedType}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {todojsx}
          {/* input + add totd */}
          <Grid container spacing={1} className="mt-2 ">
            <Grid size={12}>
              <TextField
                value={titleInput}
                className="w-full  md:w-[80%] "
                id="outlined-basic"
                label="المهمة"
                variant="outlined"
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1} className="mt-2 ">
            <Grid size={12}>
              <TextField
                value={detailsInput}
                className="w-full  md:w-[80%] "
                id="outlined-basic"
                label="تفاصيل المهمة"
                variant="outlined"
                onChange={(e) => {
                  setDetailsInput(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1} className="mt-2 ">
            <Grid size={12}>
              <Button
                variant="contained"
                onClick={handleAddClick}
                disabled={titleInput.length == 0 || detailsInput.length == 0}
              >
                اضافة مهمة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
