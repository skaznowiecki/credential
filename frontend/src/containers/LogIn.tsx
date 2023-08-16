import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { onError } from "../lib/errorLib";
import { useSnackbar } from "notistack";

export default function LogIn() {
  const { enqueueSnackbar } = useSnackbar();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    code: "",
    newPassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated && userHasAuthenticated(true);
    } catch (e: any) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleRecover = async () => {
    setIsRecovering(true);
    enqueueSnackbar("Mail para recuperar contraseña enviado", {
      variant: "info",
    });

    try {
      await Auth.forgotPassword(fields.email);
    } catch (e) {
      onError(e);
      setIsRecovering(false);
    }
  };

  const handleRecoverSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.newPassword
      );
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
    setIsRecovering(false);
  };

  const handleFormField = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    setFields({
      ...fields,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const renderLoginForm = () => {
    return (
      <>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sanos Credenciales
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            onChange={(e) => handleFormField(e)}
            value={fields.email}
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
            onChange={(e) => handleFormField(e)}
            value={fields.password}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {isLoading ? (
            <Grid container justifyContent={"center"}>
              <Grid item sx={{ mt: 3, mb: 2 }}>
                <CircularProgress />
              </Grid>
            </Grid>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Button
                fullWidth
                onClick={handleRecover}
                variant="text"
                sx={{ mt: 1, mb: 2 }}
              >
                Recuperar Contraseña
              </Button>
            </Grid>
           
          </Grid>
        </Box>
      </>
    );
  };

  const renderRecoverForm = () => {
    return (
      <>
        <Avatar id="revocer" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar Contraseña
        </Typography>
        <Box component="form" onSubmit={handleRecoverSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                onChange={(e) => handleFormField(e)}
                value={fields.email}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="code"
                type="code"
                label="Codigo confirmacion"
                onChange={(e) => handleFormField(e)}
                value={fields.code}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="newPassword"
                type="password"
                label="Nueva Contraseña"
                onChange={(e) => handleFormField(e)}
                value={fields.newPassword}
              />
            </Grid>
          </Grid>
          {isLoading ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled
            >
              <CircularProgress />
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmar
            </Button>
          )}
          <Grid container justifyContent="center"></Grid>
        </Box>
      </>
    );
  };

  return isRecovering ? renderRecoverForm() : renderLoginForm();
}
