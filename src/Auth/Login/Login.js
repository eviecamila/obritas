import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, Link, Grid, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import auth from 'services/admin/Auth.service'; // Importa auth
import './Login.css';
import LoadingCircle from 'Shared/Components/LoadingCircle';

const theme = createTheme();

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //procesar al iniciar el login
  useEffect(() => {
    //si no hay token, curso normal
    if (!localStorage.getItem('token')) { setReady(true); return; }
    //si hay, verificar el existente
    auth.verify()
      //mandarlo a admin
      .then(() => window.location.href = '/admin')
      //dejarlo aqui
      .catch(() => { auth.logout(); setReady(true); });
  }, []);

  //login
  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const data = await auth.login(username, password);
      window.location.reload()
      // Redirigir a la página principal o hacer otra acción
    } catch (error) {
      setError(error.response?.data?.detail || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  //HTML
  return ready && (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {loading && (<LoadingCircle />)}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="/assets/logo.png" alt="Site Logo" className="mx-auto h-12 mb-4" />
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Inicia sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
