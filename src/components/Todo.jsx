import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// icons
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import { TodosContext } from "../contexts/TodosContext";
import { useContext } from "react";

export default function Todo({ todo, showDailog, showUpdate }) {
  const { todos, setTodos } = useContext(TodosContext);
  // event handlers =============================================
  function handleCheckClick() {
    const updatedTods = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }
      return t;
    });
    setTodos(updatedTods);
    localStorage.setItem("todos", JSON.stringify(updatedTods));
  }
  function handleDeleteClick() {
    showDailog(todo);
  }
  function hanldeUpdateClick() {
    showUpdate(todo);
  }
  // event handlers========================================================
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* actions buttons */}
            <Grid
              className="grid"
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                className="IcondButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "#b23c17 solid 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                className="IcondButton"
                aria-lable="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "#1769aa solid 3px",
                }}
                onClick={hanldeUpdateClick}
              >
                <ModeEditOutlineOutlined />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="IcondButton"
                aria-lable="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "#8bc34a solid 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
            {/* actions buttons */}
            <Grid size={8}>
              <Typography
                className="cardText"
                variant="h5"
                sx={{ textAlign: "right", padding: 1 }}
              >
                {todo.title}
              </Typography>
              <Typography
                className="cardText"
                variant="h6"
                sx={{ textAlign: "right" }}
              >
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
