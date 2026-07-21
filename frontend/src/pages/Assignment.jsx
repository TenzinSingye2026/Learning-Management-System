import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";


function Assignment(){


    const [assignments,setAssignments] = useState([]);

    const [courses,setCourses] = useState([]);


    const [editMode,setEditMode] = useState(false);

    const [editId,setEditId] = useState(null);



    const [form,setForm] = useState({

        title:"",
        description:"",
        dueDate:"",
        totalMarks:"",
        course:""

    });





    const loadData = async()=>{


        try{


            const assignmentData = await API.get("/assignments");

            const courseData = await API.get("/courses");


            setAssignments(assignmentData.data);

            setCourses(courseData.data);



        }catch(error){

            console.log(error);

        }


    };





    useEffect(()=>{

        loadData();

    },[]);







    const submitAssignment = async(e)=>{


        e.preventDefault();



        try{


            if(editMode){


                await API.put(

                    `/assignments/${editId}`,

                    form

                );


            }else{


                await API.post(

                    "/assignments",

                    form

                );


            }






            setForm({

                title:"",
                description:"",
                dueDate:"",
                totalMarks:"",
                course:""

            });



            setEditMode(false);

            setEditId(null);


            loadData();



        }catch(error){

            console.log(error);

        }


    };








    const deleteAssignment = async(id)=>{


        await API.delete(

            `/assignments/${id}`

        );


        loadData();


    };









    const editAssignment = (assignment)=>{


        setEditMode(true);


        setEditId(assignment._id);



        setForm({

            title:assignment.title,

            description:assignment.description,

            dueDate:assignment.dueDate?.slice(0,10),

            totalMarks:assignment.totalMarks,

            course:assignment.course?._id || assignment.course


        });


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

                        📝 Assignments

                    </h2>






                    <div className="card shadow p-4 mb-4">


                        <h4>

                            {editMode
                            
                            ?
                            
                            "Update Assignment"

                            :

                            "Add Assignment"

                            }

                        </h4>





                        <form onSubmit={submitAssignment}>


                            <input

                            className="form-control mb-2"

                            placeholder="Title"

                            value={form.title}

                            onChange={(e)=>setForm({

                                ...form,

                                title:e.target.value

                            })}

                            />






                            <textarea

                            className="form-control mb-2"

                            placeholder="Description"

                            value={form.description}

                            onChange={(e)=>setForm({

                                ...form,

                                description:e.target.value

                            })}

                            />







                            <input

                            type="date"

                            className="form-control mb-2"

                            value={form.dueDate}

                            onChange={(e)=>setForm({

                                ...form,

                                dueDate:e.target.value

                            })}

                            />







                            <input

                            type="number"

                            className="form-control mb-2"

                            placeholder="Total Marks"

                            value={form.totalMarks}

                            onChange={(e)=>setForm({

                                ...form,

                                totalMarks:e.target.value

                            })}

                            />







                            <select

                            className="form-control mb-3"

                            value={form.course}

                            onChange={(e)=>setForm({

                                ...form,

                                course:e.target.value

                            })}

                            >


                                <option value="">

                                    Select Course

                                </option>


                                {

                                    courses.map((course)=>(


                                        <option

                                        key={course._id}

                                        value={course._id}

                                        >

                                            {course.title}

                                        </option>


                                    ))

                                }


                            </select>






                            <button className="btn btn-primary">


                                {

                                editMode

                                ?

                                "Update Assignment"

                                :

                                "Add Assignment"

                                }


                            </button>




                        </form>


                    </div>








                    <table className="table table-bordered shadow">


                        <thead>

                            <tr>

                                <th>
                                    Title
                                </th>

                                <th>
                                    Course
                                </th>

                                <th>
                                    Marks
                                </th>

                                <th>
                                    Due Date
                                </th>

                                <th>
                                    Action
                                </th>


                            </tr>

                        </thead>





                        <tbody>


                        {

                            assignments.map((assignment)=>(


                                <tr key={assignment._id}>


                                    <td>
                                        {assignment.title}
                                    </td>


                                    <td>
                                        {assignment.course?.title}
                                    </td>


                                    <td>
                                        {assignment.totalMarks}
                                    </td>


                                    <td>
                                        {assignment.dueDate?.slice(0,10)}
                                    </td>


                                    <td>


                                        <button

                                        className="btn btn-warning btn-sm me-2"

                                        onClick={()=>editAssignment(assignment)}

                                        >

                                            Edit

                                        </button>





                                        <button

                                        className="btn btn-danger btn-sm"

                                        onClick={()=>deleteAssignment(assignment._id)}

                                        >

                                            Delete

                                        </button>



                                    </td>


                                </tr>


                            ))

                        }


                        </tbody>


                    </table>




                </div>


            </div>


        </div>


        </>

    );

}


export default Assignment;