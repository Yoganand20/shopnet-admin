
import { Provider } from "react-redux";
import { store } from "./lib/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router';
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./lib/protectedRoute";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "./components/ui/sonner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import PasswordResetPage from "./pages/PasswordResetPage";



function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<PasswordResetPage />} />
          <Route path='/email-verification' element={<EmailVerificationPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
      <Toaster />
    </Provider>
  )
}

export default App

