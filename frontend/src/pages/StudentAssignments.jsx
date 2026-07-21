import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";



function StudentAssignments(){


    const [assignments,setAssignments] = useState([]);




    const getMyAssignments = async()=>{


        try{


            const response = await API.get(
                "/student/my-assignments"
            );


            setAssignments(response.data);



        }catch(error){


            console.log(

                error.response?.data || error.message

            );


        }


    };





    useEffect(()=>{


        getMyAssignments();


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

                        📝 My Assignments

                    </h2>




                    <div className="row mt-4">


                    {


                    assignments.length === 0 ?


                    (

                        <p>
                            No assignments available.
                        </p>

                    )


                    :


                    assignments.map((assignment)=>(


                        <div

                        className="col-md-4 mb-4"

                        key={assignment._id}

                        >


                            <div className="card shadow">


                                <div className="card-body">


                                    <h5>

                                        {assignment.title}

                                    </h5>



                                    <p>

                                        Course:

                                        {" "}

                                        {assignment.course?.title}

                                    </p>




                                    <p>

                                        {assignment.description}

                                    </p>



                                    {
                                    assignment.dueDate &&

                                    <p>

                                    Due:

                                    {" "}

                                    {
                                        new Date(
                                            assignment.dueDate
                                        ).toLocaleDateString()
                                    }

                                    </p>

                                    }



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


export default StudentAssignments;