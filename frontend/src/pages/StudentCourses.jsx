import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";



function StudentCourses(){


    const [availableCourses,setAvailableCourses] = useState([]);

    const [myCourses,setMyCourses] = useState([]);





    const loadCourses = async()=>{


        try{


            const courses = await API.get(

                "/student/courses"

            );


            const enrolled = await API.get(

                "/student/my-courses"

            );



            setAvailableCourses(
                courses.data
            );


            setMyCourses(
                enrolled.data
            );



        }catch(error){


            console.log(

                error.response?.data || error.message

            );


        }


    };







    useEffect(()=>{


        loadCourses();


    },[]);








    const enrollCourse = async(courseId)=>{


        try{


            await API.post(

                `/student/enroll/${courseId}`

            );


            alert(
                "Course enrolled successfully"
            );


            loadCourses();



        }catch(error){


            alert(

                error.response?.data?.message ||

                "Enrollment failed"

            );


        }


    };









    const isEnrolled=(courseId)=>{


        return myCourses.some(

            item =>

            item.course?._id === courseId

        );


    };









    return(

        <>


        <Navbar/>




        <div className="container-fluid">


            <div className="row">



                <div className="col-md-3 col-lg-2 p-0">


                    <Sidebar/>


                </div>






                <div className="col-md-9 col-lg-10 p-4">



                    <h2>

                        📚 Available Courses

                    </h2>





                    <div className="row mt-4">


                    {


                    availableCourses.map((course)=>(



                        <div

                        className="col-md-4 mb-4"

                        key={course._id}

                        >



                            <div className="card shadow">



                                <div className="card-body">



                                    <h5>

                                        {course.title}

                                    </h5>




                                    <p>

                                    Category:

                                    {" "}

                                    {course.category}

                                    </p>





                                    <p>

                                    Duration:

                                    {" "}

                                    {course.duration}

                                    </p>





                                    <p>

                                    Instructor:

                                    {" "}

                                    {course.instructor?.name}

                                    </p>







                                    {

                                    isEnrolled(course._id)


                                    ?


                                    <button

                                    className="btn btn-success"

                                    disabled

                                    >

                                        Enrolled

                                    </button>


                                    :


                                    <button

                                    className="btn btn-primary"

                                    onClick={()=>enrollCourse(course._id)}

                                    >

                                        Enroll Now

                                    </button>


                                    }



                                </div>


                            </div>


                        </div>



                    ))


                    }



                    </div>







                    <hr/>







                    <h2>

                        🎓 My Courses

                    </h2>





                    <div className="row mt-4">



                    {


                    myCourses.length===0 ?


                    (

                        <p>

                        No enrolled courses yet.

                        </p>


                    )


                    :


                    myCourses.map((item)=>(


                        <div

                        className="col-md-4 mb-4"

                        key={item._id}

                        >


                            <div className="card shadow">


                                <div className="card-body">


                                    <h5>

                                        {item.course?.title}

                                    </h5>


                                    <p>

                                        Status:

                                        {" "}

                                        {item.status}

                                    </p>


                                </div>


                            </div>


                        </div>


                    ))


                    }


                    </div>



                </div>


            </div>


        </div>


        </>

    );


}


export default StudentCourses;