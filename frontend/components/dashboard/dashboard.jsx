"use client";
import { Grid, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
export default function Dashboard() {
  return (
    <>
      <Box sx={{pl: 2}}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontFamily: "Albert Sans, sans-serif", fontWeight: "bold" }}
        >
          Hello Nish,
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ fontFamily: "Albert Sans, sans-serif", mt: 1 }}
        >
          Good Afternoon,
        </Typography>
      </Box>
    </>
  );
}
