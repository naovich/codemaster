import React, { useEffect, useRef, useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../db/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase";

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();

  const [firstnameOk, setFirstnameOk] = useState(true);
  const [lastnameOk, setLastnameOk] = useState(true);
  const [emailOk, setEmailOk] = useState(true);
  const [passwordOk, setPasswordOk] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
      }
    });
  }, []);

  const newAccount = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("firstname").length > 2) {
      setFirstnameOk(true);
    } else {
      setFirstnameOk(false);
    }

    data.get("lastname").length > 2
      ? setLastnameOk(true)
      : setLastnameOk(false);

    ValidateEmail(data.get("email")) ? setEmailOk(true) : setEmailOk(false);

    data.get("password").length > 6 &&
    data.get("password") === data.get("password2")
      ? setPasswordOk(true)
      : setPasswordOk(false);

    firstnameOk && lastnameOk && emailOk && passwordOk
      ? registerWithEmailAndPassword(
          data.get("firstname"),
          data.get("lastname"),
          data.get("email"),
          data.get("password")
        )
      : console.log("Corrigez le formulaire");

    setIsSubmited(true);
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
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
              error={!firstnameOk}
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
              error={!lastnameOk}
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
              error={!emailOk}
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
              error={!passwordOk}
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
              error={!passwordOk}
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
            <Grid item>
              <Link href="/login" variant="body2">
                {"Se connecter"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
