import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";



function StudentLessons(){


    const [lessons,setLessons] = useState([]);




    const getMyLessons = async()=>{


        try{


            const response = await API.get(

                "/student/my-lessons"

            );


            setLessons(response.data);



        }catch(error){


            console.log(

                error.response?.data || error.message

            );


        }


    };





    useEffect(()=>{


        getMyLessons();


    },[]);







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

                        📖 My Lessons

                    </h2>





                    <div className="row mt-4">


                    {


                    lessons.length === 0 ?


                    (

                        <p>

                            No lessons available yet.

                        </p>


                    )


                    :


                    lessons.map((lesson)=>(



                        <div

                        className="col-md-4 mb-4"

                        key={lesson._id}

                        >


                            <div className="card shadow">


                                <div className="card-body">


                                    <h5>

                                        {lesson.title}

                                    </h5>



                                    <p>

                                        Course:

                                        {" "}

                                        {lesson.course?.title}

                                    </p>




                                    <p>

                                        {lesson.description}

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



export default StudentLessons;