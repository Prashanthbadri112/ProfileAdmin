import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UsersList from "./pages/user/UsersList";
import CreateUser from "./pages/user/CreateUser";
import RetrieveUser from "./pages/user/RetrieveUser";
import EditUser from "./pages/user/EditUser";
import RemoveUser from "./pages/user/RemoveUser";
import Contact from "./pages/static/Contact";
import AboutUs from "./pages/static/AboutUs";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersList/>} />
          <Route path="/create" element={<CreateUser/>} />
          <Route path="/:userId" element={<RetrieveUser/>} />
          <Route path="/edit/:userId" element={<EditUser/>} />
          <Route path="/remove/:userId" element={<RemoveUser/>} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
