import React from "react";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import CoursePage from "./Components/Courses/coursePage";
import MainPage from "./Components/mainPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/:courseId?/:lessonId?" element={<CoursePage/>}/>
            </Routes>
            <ToastContainer/>
        </div>
    )
}

export default App;

