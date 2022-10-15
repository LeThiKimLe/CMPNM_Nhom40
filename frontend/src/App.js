import { Routes, Route } from 'react-router-dom';
import MainLayout from './containers/layout';
import Home from './pages/home';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material Dashboard 2 React themes
import theme from './assets/theme';
import SignIn from './pages/sign_in';
import SignUp from './pages/sign-up';
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
