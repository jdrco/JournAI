import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../components/HomePage";
import LandingPage from "../components/LandingPage";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) throw error;

  return <div>{user ? <HomePage /> : <LandingPage />}</div>;
};

export default Home;
