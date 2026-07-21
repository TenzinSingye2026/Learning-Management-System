import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import Course from "./pages/Course";
import Enrollment from "./pages/Enrollment";
import Lesson from "./pages/Lesson";
import Assignment from "./pages/Assignment";
import Users from "./pages/Users";
import StudentCourses from "./pages/StudentCourses";
import StudentAssignments from "./pages/StudentAssignments";
import StudentLessons from "./pages/StudentLessons";



function App(){


    return(


        <BrowserRouter>


            <Routes>



                <Route

                path="/"

                element={<Login/>}

                />





                <Route

                path="/register"

                element={<Register/>}

                />








                {/* Dashboard - All roles */}

                <Route

                path="/dashboard"

                element={

                    <PrivateRoute roles={[
                        "admin",
                        "instructor",
                        "student"
                    ]}>

                        <Dashboard/>

                    </PrivateRoute>

                }

                />









                {/* User Management - Admin only */}

                <Route

                path="/users"

                element={

                    <PrivateRoute roles={[
                        "admin"
                    ]}>

                        <Users/>

                    </PrivateRoute>

                }

                />









                {/* Courses - Admin + Instructor */}

                <Route

                path="/courses"

                element={

                    <PrivateRoute roles={[
                        "admin",
                        "instructor"
                    ]}>

                        <Course/>

                    </PrivateRoute>

                }

                />









                {/* Enrollments - Admin + Instructor */}

                <Route

                path="/enrollments"

                element={

                    <PrivateRoute roles={[
                        "admin",
                        "instructor"
                    ]}>

                        <Enrollment/>

                    </PrivateRoute>

                }

                />









                {/* Lessons - Admin + Instructor */}

                <Route

                path="/lessons"

                element={

                    <PrivateRoute roles={[
                        "admin",
                        "instructor"
                    ]}>

                        <Lesson/>

                    </PrivateRoute>

                }

                />









                {/* Assignments - Admin + Instructor */}

                <Route

                path="/assignments"

                element={

                    <PrivateRoute roles={[
                        "admin",
                        "instructor"
                    ]}>

                        <Assignment/>

                    </PrivateRoute>

                }

                />


                <Route
                path="/student-courses"
                element={
                    <PrivateRoute roles={["student"]}>
                    <StudentCourses/>
                    </PrivateRoute>
                }
                />


                 <Route
                  path="/student-assignments"
                  element={
                      <PrivateRoute roles={["student"]}>
                      <StudentAssignments/>
                      </PrivateRoute>
                }
                />


                 <Route
                 path="/student-lessons"
                 element={
                     <PrivateRoute roles={["student"]}>
                     <StudentLessons/>
                     </PrivateRoute>
                }
                />





            </Routes>



        </BrowserRouter>


    );


}



export default App;