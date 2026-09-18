import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// icons
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import TextField from "@mui/material/TextField";
import { TodosContext } from "../contexts/TodosContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";

export default function Todo({ todo }) {
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [todosUpdate, settodosUpdate] = useState({
    title: todo.title,
    details: todo.details,
  });
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
    setshowDeleteDialog(true);
  }
  function handleCloseDialogClick() {
    setshowDeleteDialog(false);
  }
  function handleDeleteConfirmation() {
    const updatedTodo = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }
  function hanldeUpdateClose() {
    setShowUpdateDialog(true);
  }
  function handleUpdateConfirmation() {
    const newUpdatedTodo = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: todosUpdate.title, details: todosUpdate.details };
      } else {
        return t;
      }
    });
    setTodos(newUpdatedTodo);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(newUpdatedTodo));
  }
  function hanldeUpdateClick() {
    setShowUpdateDialog(false);
  }

  // event handlers========================================================
  return (
    <>
      {/* delete dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={showDeleteDialog}
        onClose={handleCloseDialogClick}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك فى الحذف ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يتم التراجع بعد الحذف الان
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseDialogClick}>اغلاق</Button>
            <Button onClick={handleDeleteConfirmation}>حذف</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/*End delete dialog */}

      {/* Edite dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={showUpdateDialog}
        onClose={hanldeUpdateClick}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك فى الحذف ؟
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={todosUpdate.title}
            margin="dense"
            id="title"
            label="المهمة"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              settodosUpdate({ ...todosUpdate, title: e.target.value });
            }}
          ></TextField>
          <TextField
            autoFocus
            value={todosUpdate.details}
            margin="dense"
            id="description"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              settodosUpdate({ ...todosUpdate, details: e.target.value });
            }}
          ></TextField>

          <DialogActions>
            <Button style={{ direction: "rtl" }} onClick={hanldeUpdateClick}>
              اغلاق
            </Button>
            <Button
              style={{ direction: "rtl" }}
              onClick={handleUpdateConfirmation}
            >
              تعديل
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* End Edite dialog */}
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
                onClick={hanldeUpdateClose}
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
