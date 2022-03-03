import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../Components/Copyright";

const theme = createTheme();

export default function SignIn() {
  const newAccount = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    let = false;
    let firstnameOk = false;
    let lastnameOk = false;
    let passwordOk = false;

    data.get("firstname").length > 2
      ? (firstnameOk = true)
      : (firstnameOk = false);
    data.get("lastname").length > 2
      ? (lastnameOk = true)
      : (lastnameOk = false);
    ValidateEmail(data.get("email")) ? (emailOk = true) : (emailOk = false);
    data.get("password").length > 6 &&
    data.get("password") === data.get("password2")
      ? (emailOk = true)
      : (emailOk = false);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  function ValidateEmail(mail) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        myForm.emailAddr.value
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Nouveau compte
          </Typography>
          <Box component="form" onSubmit={newAccount} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Prénom"
              name="firstname"
              autoComplete="firstname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Nom"
              name="lastname"
              autoComplete="lastname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password2"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
