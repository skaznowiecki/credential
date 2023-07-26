import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import CircularProgress from "@mui/material/CircularProgress";
import { Auth } from "aws-amplify";
import { onError } from "../lib/errorLib";
import { CognitoUser } from "@aws-amplify/auth";
import { FormControl } from "@mui/material";

export default function SignUp() {
  const nav = useNavigate();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const [newUser, setNewUser] = useState<CognitoUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    givenName: "",
    familyName: "",
    confirmationPassword: "",
    confirmationEmail: "",
    confirmationCode: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated, nav]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { user } = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          given_name: fields.givenName,
          family_name: fields.familyName,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      setIsLoading(false);
      setNewUser(user);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated && userHasAuthenticated(true);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setIsResending(true);

    try {
      await Auth.resendSignUp(fields.confirmationEmail);
      onError("Código reenviado")
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
    setIsResending(false);
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

  const renderSingUpForm = () => {
    return (
      <>
        <Avatar id="signup" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nueva Cuenta
        </Typography>
        <FormControl component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                required
                name="givenName"
                fullWidth
                id="givenName"
                onChange={(e) => handleFormField(e)}
                value={fields.givenName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="familyName"
                label="Apellido"
                name="familyName"
                onChange={(e) => handleFormField(e)}
                value={fields.familyName}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={(e) => handleFormField(e)}
                value={fields.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={(e) => handleFormField(e)}
                value={fields.password}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmationPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmationPassword"
                onChange={(e) => handleFormField(e)}
                value={fields.confirmationPassword}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {isLoading ? (
            <Button
              type="submit"
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
              Registrarse
            </Button>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" underline="hover">
                {"Ya estas registrado? Inicia sesion"}
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </>
    );
  };

  const renderConfirmationForm = () => {
    return (
      <>
        <Avatar id="confirmation" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirmar Registro
        </Typography>
        <Box
          component="form"
          onSubmit={handleConfirmationSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmationEmail"
                label="Email"
                type="confirmationEmail"
                onChange={(e) => handleFormField(e)}
                value={fields.confirmationEmail}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmationCode"
                type="confirmationCode"
                label="Codigo confirmacion"
                onChange={(e) => handleFormField(e)}
                value={fields.confirmationCode}
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
          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleResendCode}
              sx={{ mt: 1, mb: 2 }}
            >
              Reenviar codigo
            </Button>
          </Grid>
          <Grid container justifyContent="center"></Grid>
        </Box>
      </>
    );
  };

  return newUser ? renderConfirmationForm() : renderSingUpForm();
}
