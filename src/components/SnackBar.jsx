import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
export default function SnackBar({ open, message }) {
  return (
    <>
      <Stack spacing={2} sx={{ width: "100" }}>
        <Snackbar open={open}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
