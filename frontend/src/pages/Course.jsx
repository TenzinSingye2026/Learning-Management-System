import { useEffect, useState } from "react";
import API from "../services/api";


function Course(){

    const [courses, setCourses] = useState([]);

    const [instructors, setInstructors] = useState([]);


    const [formData, setFormData] = useState({

        title:"",
        instructor:"",
        category:"",
        duration:"",
        description:""

    });


    const [editId, setEditId] = useState(null);



    // Get Courses
    const getCourses = async()=>{

        try{

            const res = await API.get("/courses");

            setCourses(res.data);


        }catch(error){

            console.log(error);

        }

    };



    // Get Instructors
    const getInstructors = async()=>{

        try{

           const res = await API.get(
               "/users/instructors"
           );


           setInstructors(res.data);


       }catch(error){

           console.log(error);

       }

    };



    useEffect(()=>{

        getCourses();
        getInstructors();

    },[]);




    // Input Change
    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };





    // Add / Update Course
    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            if(editId){


                await API.put(
                    `/courses/${editId}`,
                    formData
                );


            }else{


                await API.post(
                    "/courses",
                    formData
                );


            }



            setFormData({

                title:"",
                instructor:"",
                category:"",
                duration:"",
                description:""

            });


            setEditId(null);


            getCourses();



        }catch(error){

            console.log(error);

        }


    };





    // Edit
    const editCourse=(course)=>{


        setFormData({

            title:course.title,
            instructor:course.instructor._id,
            category:course.category,
            duration:course.duration,
            description:course.description

        });


        setEditId(course._id);


    };





    // Delete
    const deleteCourse=async(id)=>{


        try{


            await API.delete(
                `/courses/${id}`
            );


            getCourses();


        }catch(error){

            console.log(error);

        }


    };





    return(

        <div className="container mt-4">


            <h2>
                Course Management
            </h2>



            <div className="card mt-3">

                <div className="card-body">


                    <form onSubmit={handleSubmit}>


                        <input

                        className="form-control mb-2"

                        placeholder="Course Title"

                        name="title"

                        value={formData.title}

                        onChange={handleChange}

                        />




                        <select

                        className="form-control mb-2"

                        name="instructor"

                        value={formData.instructor}

                        onChange={handleChange}

                        >


                            <option value="">
                                Select Instructor
                            </option>


                            {
                                instructors.map(
                                    user=>(
                                        
                                    <option
                                    key={user._id}
                                    value={user._id}
                                    >

                                    {user.name}

                                    </option>

                                    )
                                )
                            }


                        </select>





                        <input

                        className="form-control mb-2"

                        placeholder="Category"

                        name="category"

                        value={formData.category}

                        onChange={handleChange}

                        />






                        <input

                        className="form-control mb-2"

                        placeholder="Duration"

                        name="duration"

                        value={formData.duration}

                        onChange={handleChange}

                        />







                        <textarea

                        className="form-control mb-2"

                        placeholder="Description"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        />






                        <button className="btn btn-primary">

                            {
                                editId
                                ?
                                "Update Course"
                                :
                                "Add Course"
                            }


                        </button>



                    </form>


                </div>


            </div>






            <table className="table table-bordered mt-4">


                <thead className="table-dark">


                    <tr>

                        <th>
                            Title
                        </th>


                        <th>
                            Instructor
                        </th>


                        <th>
                            Category
                        </th>


                        <th>
                            Duration
                        </th>


                        <th>
                            Actions
                        </th>


                    </tr>


                </thead>



                <tbody>


                {
                    courses.map(course=>(


                    <tr key={course._id}>


                        <td>
                            {course.title}
                        </td>


                        <td>
                            {
                                course.instructor?.name
                            }
                        </td>


                        <td>
                            {course.category}
                        </td>


                        <td>
                            {course.duration}
                        </td>


                        <td>


                            <button

                            className="btn btn-warning btn-sm me-2"

                            onClick={()=>editCourse(course)}

                            >

                                Edit

                            </button>




                            <button

                            className="btn btn-danger btn-sm"

                            onClick={()=>deleteCourse(course._id)}

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


    );

}


export default Course;