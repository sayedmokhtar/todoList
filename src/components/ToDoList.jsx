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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// component import

import Todo from "./Todo";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "../contexts/ToastContext";
import { useTodos } from "../contexts/TodosContext";

export default function ToDoList() {
  const { todos, history, dispatch } = useTodos();
  const showHideToast = useToast();
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [displayedTodosType, setDisplayedTodosType] = useState("");
  const [dialogTodo, setDialogTodo] = useState({ title: "", details: "" });
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const completedTods = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const notCompleted = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendred;
  if (displayedTodosType == "completed") {
    todosToBeRendred = completedTods;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendred = notCompleted;
  } else if (displayedTodosType == "History") {
    todosToBeRendred = history;
  } else {
    todosToBeRendred = todos;
  }
  useEffect(() => {
    console.log("get eefect gun");
    dispatch({ type: "get" });
  }, [dispatch]);

  // event handler

  function changeDisplayedType(e, newValue) {
    if (newValue !== null) {
      setDisplayedTodosType(newValue);
    }
  }
  function handleAddClick() {
    dispatch({
      type: "added",
      payLoad: { title: titleInput, details: detailsInput },
    });
    setTitleInput("");
    setDetailsInput("");
    showHideToast("تمت الاضافة بنجاح");
  }
  // event handler
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setshowDeleteDialog(true);
  }

  function handleCloseDialogClick() {
    setshowDeleteDialog(false);
  }
  function handleDeleteConfirmation() {
    dispatch({
      type: "deleted",
      payLoad: dialogTodo,
    });
    setshowDeleteDialog(false);
    showHideToast("تمت الحذف بنجاح");
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function hanldeUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirmation() {
    dispatch({ type: "updated", payLoad: dialogTodo });
    setShowUpdateDialog(false);
    showHideToast("تم التعديل بنجاح");
  }
  function handleClearHistory() {
    dispatch({ type: "clear" });
  }

  const todojsx = todosToBeRendred.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDailog={openDeleteDialog}
        showUpdate={openUpdateDialog}
        isHistory={displayedTodosType == "History"}
      />
    );
  });
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
        onClose={hanldeUpdateClose}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك فى التعديل ؟
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={dialogTodo.title}
            margin="dense"
            id="title"
            label="المهمة"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          ></TextField>
          <TextField
            autoFocus
            value={dialogTodo.details}
            margin="dense"
            id="description"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          ></TextField>

          <DialogActions>
            <Button style={{ direction: "rtl" }} onClick={hanldeUpdateClose}>
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

      <Container className="Container">
        <Card
          className="w-full text-center md:w-1/2"
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography className=" text-purple-400 py-3 text-lg font-title font-extrabold">
              Your Tasks
            </Typography>
            <Divider />
            <ToggleButtonGroup
              exclusive
              value={displayedTodosType}
              className="direction-ltr mt-5 "
              onChange={changeDisplayedType}
            >
              <ToggleButton value="non-completed">not Achieved</ToggleButton>
              <ToggleButton value="completed">Achieved</ToggleButton>
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="History">History</ToggleButton>
              {displayedTodosType == "History" && history.length > 0 && (
                <ToggleButton value="clear" onClick={handleClearHistory}>
                  clear
                </ToggleButton>
              )}
            </ToggleButtonGroup>
            {todojsx}
            {/* input + add totd */}
            <Grid container spacing={1} className="mt-2 ">
              <Grid size={12}>
                <TextField
                  value={titleInput}
                  className="w-full  md:w-[80%] "
                  id="outlined-basic"
                  label="Task"
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
                  label=" Details"
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
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
