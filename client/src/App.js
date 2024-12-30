import './App.css';

// import components
import CompNavbar from './components/navbar/navbar'
import CompBodyTasks from './components/views/body'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CompFormEditTasks from "./components/views/editTask";
import ImageUpload from './components/ImageUpload';
function App() {
  return (
      <div className="App">
          <header className="align-content-md-center">
              <CompNavbar></CompNavbar>
          </header>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<CompBodyTasks/>}></Route>
                  <Route path="/tasks/:id/edit" element={<CompFormEditTasks/>}></Route>
                  <Route path="/images" element={<ImageUpload />} />

              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
