import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import QuestionsPage from "./components/QuestionsPage";
import AuthCompletePage from "./components/AuthCompletePage";
import BuyPremium from "./components/BuyPreium";
import PaymentSucess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import Lobby from "./screens/Lobby";
import RoomPage from "./screens/RoomPage";
import Profile2 from "./components/Profile2";
import Test from "./components/Test.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import ResetPassword from "./components/ProfileComponents/ResetPassword.jsx";
import ChangePassword from "./components/ProfileComponents/ChangePassword.jsx";
import DeleteAccount from "./components/ProfileComponents/DeleteAccount.jsx";
import Preferences from "./components/Preferences.jsx";

function App() {
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const location = useLocation(); // ✅ Needed for page transitions

  return (
    <>
      <ToastContainer />

      {/* ✅ AnimatePresence for page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/resetpassword/:id" element={<ChangePassword />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/profile/deleteaccount" element={<DeleteAccount />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/profile" element={<Profile2 />} />
            <Route path="/getPremium" element={<BuyPremium />} />
            <Route path="/paymentSuccess" element={<PaymentSucess />} />
            <Route path="/paymentFailed" element={<PaymentFailure />} />
            <Route path="/authComplete" element={<AuthCompletePage />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
