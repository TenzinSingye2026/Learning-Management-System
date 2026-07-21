import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";


import {
    FaUsers,
    FaBook,
    FaUserGraduate,
    FaClipboardList,
    FaGraduationCap
} from "react-icons/fa6";



function Dashboard(){


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const role = user?.role;



    const [stats,setStats] = useState({

        users:0,

        courses:0,

        enrollments:0,

        lessons:0,

        assignments:0

    });







    const getDashboardData = async()=>{


        try{


            const [

                courses,

                enrollments,

                lessons,

                assignments


            ] = await Promise.all([


                API.get("/courses"),

                API.get("/enrollments"),

                API.get("/lessons"),

                API.get("/assignments")


            ]);





            let usersCount = 0;




            if(role === "admin"){


                try{


                    const users = await API.get(
                        "/users"
                    );


                    usersCount = users.data.length;


                }catch(error){


                    console.log(
                        "User count unavailable"
                    );


                }


            }






            setStats({


                users:usersCount,


                courses:courses.data.length,


                enrollments:enrollments.data.length,


                lessons:lessons.data.length,


                assignments:assignments.data.length


            });





        }catch(error){


            console.log(

                error.response?.data || error.message

            );


        }


    };







    useEffect(()=>{


        getDashboardData();


    },[]);









    const cards = [


        ...(role === "admin" ? [

            {

                title:"Total Users",

                count:stats.users,

                icon:<FaUsers/>,

                color:"primary"

            },


            {

                title:"Total Courses",

                count:stats.courses,

                icon:<FaBook/>,

                color:"success"

            },


            {

                title:"Total Enrollments",

                count:stats.enrollments,

                icon:<FaUserGraduate/>,

                color:"warning"

            },


            {

                title:"Total Lessons",

                count:stats.lessons,

                icon:<FaGraduationCap/>,

                color:"info"

            },


            {

                title:"Total Assignments",

                count:stats.assignments,

                icon:<FaClipboardList/>,

                color:"danger"

            }


        ] : []),







        ...(role === "instructor" ? [

            {

                title:"My Courses",

                count:stats.courses,

                icon:<FaBook/>,

                color:"success"

            },


            {

                title:"Student Enrollments",

                count:stats.enrollments,

                icon:<FaUserGraduate/>,

                color:"warning"

            },


            {

                title:"My Lessons",

                count:stats.lessons,

                icon:<FaGraduationCap/>,

                color:"info"

            },


            {

                title:"My Assignments",

                count:stats.assignments,

                icon:<FaClipboardList/>,

                color:"danger"

            }


        ] : []),







        ...(role === "student" ? [

            {

                title:"My Courses",

                count:stats.courses,

                icon:<FaBook/>,

                color:"success"

            },


            {

                title:"Available Lessons",

                count:stats.lessons,

                icon:<FaGraduationCap/>,

                color:"info"

            },


            {

                title:"Pending Assignments",

                count:stats.assignments,

                icon:<FaClipboardList/>,

                color:"danger"

            }


        ] : [])


    ];








    return(


        <>


        <Navbar/>




        <div className="container-fluid">


            <div className="row">



                <div className="col-md-3 col-lg-2 p-0">

                    <Sidebar/>

                </div>





                <div className="col-md-9 col-lg-10 p-4">





                    <div className="mb-4">


                        <h2>

                            📚 Welcome back, {user?.name}

                        </h2>



                        <p className="text-muted">

                            Learning Management System Dashboard

                        </p>


                    </div>








                    <div className="row">


                    {


                        cards.map((card,index)=>(



                            <div

                            className="col-md-4 mb-4"

                            key={index}

                            >



                                <div

                                className={`card shadow border-${card.color} h-100`}

                                >



                                    <div className="card-body d-flex justify-content-between align-items-center">


                                        <div>


                                            <h6 className="text-muted">

                                                {card.title}

                                            </h6>


                                            <h1>

                                                {card.count}

                                            </h1>


                                        </div>





                                        <div

                                        className={`text-${card.color}`}

                                        style={{

                                            fontSize:"45px"

                                        }}

                                        >

                                            {card.icon}


                                        </div>



                                    </div>


                                </div>


                            </div>


                        ))


                    }


                    </div>








                    <div className="card shadow mt-3">


                        <div className="card-body">


                            <h4>

                                🚀 Quick Overview

                            </h4>




                            <p className="text-muted">

                                Logged in as:

                                <strong>

                                    {" "}{role}

                                </strong>

                            </p>







                            {

                                role === "admin" && (

                                    <p>

                                        Manage users, courses, enrollments, lessons and assignments across the LMS platform.

                                    </p>

                                )

                            }







                            {

                                role === "instructor" && (

                                    <p>

                                        Create courses, manage lessons and assignments, and monitor student enrollments.

                                    </p>

                                )

                            }







                            {

                                role === "student" && (

                                    <p>

                                        Access your courses, study lessons, and complete assigned tasks.

                                    </p>

                                )

                            }





                        </div>


                    </div>







                </div>


            </div>


        </div>




        </>


    );


}



export default Dashboard;