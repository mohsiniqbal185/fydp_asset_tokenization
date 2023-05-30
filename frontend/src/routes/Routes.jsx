import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Projects from "../components/Projects/Projects";
import Navbar from "../components/Navbar/Navbar";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import HomeContent from "../components/HomeContent/HomeContent";
import Learn from "../components/Learn/Learn";
import SingleProperty from "../components/SingleProperty/SingleProperty";
import Portal from "../components/Portal/Portal";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <Header />
            <HomeContent />
            <Footer />
          </>
        }
      />
      <Route path="/*" element={<AppLayout />}>
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="learn" element={<Learn />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/portal" element={<Portal/>}/>
      <Route path="projects/:id" element={
        <>
        <Header/>
        <SingleProperty />
        <Footer/>
      </>
      } />
    </>
  )
);
