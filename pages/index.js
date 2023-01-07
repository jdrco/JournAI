import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../components/HomePage";
import LandingPage from "../components/LandingPage";
import LoadingPage from "../components/LoadingPage";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <LoadingPage />
      <p>Loading...</p>
    </div>
    );
  }

  if (error) throw error;

  return <div>{user ? <HomePage /> : <LandingPage />}</div>;
};

export default Home;
