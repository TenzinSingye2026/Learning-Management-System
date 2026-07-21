import { useEffect, useState } from "react";
import API from "../services/api";


function Enrollment(){


    const [enrollments,setEnrollments] = useState([]);

    const [students,setStudents] = useState([]);

    const [courses,setCourses] = useState([]);



    const [formData,setFormData] = useState({

        student:"",
        course:""

    });



    const getEnrollments = async()=>{

        try{

            const res = await API.get(
                "/enrollments"
            );

            setEnrollments(res.data);


        }catch(error){

            console.log(error);

        }

    };





    const getStudents = async()=>{

        try{

            const res = await API.get(
                "/users"
            );


            const data = res.data.filter(

                user=>user.role==="student"

            );


            setStudents(data);


        }catch(error){

            console.log(error);

        }

    };






    const getCourses = async()=>{

        try{

            const res = await API.get(
                "/courses"
            );


            setCourses(res.data);


        }catch(error){

            console.log(error);

        }

    };






    useEffect(()=>{


        getEnrollments();

        getStudents();

        getCourses();


    },[]);






    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };






    const handleSubmit=async(e)=>{


        e.preventDefault();


        try{


            await API.post(
                "/enrollments",
                formData
            );



            setFormData({

                student:"",
                course:""

            });



            getEnrollments();



        }catch(error){

            console.log(error);

        }


    };






    const deleteEnrollment=async(id)=>{


        try{


            await API.delete(
                `/enrollments/${id}`
            );


            getEnrollments();



        }catch(error){

            console.log(error);

        }


    };






    return(

        <div className="container mt-4">


            <h2>
                Enrollment Management
            </h2>



            <div className="card mt-3">

                <div className="card-body">


                    <form onSubmit={handleSubmit}>



                        <select

                        className="form-control mb-3"

                        name="student"

                        value={formData.student}

                        onChange={handleChange}

                        >


                            <option value="">
                                Select Student
                            </option>



                            {
                                students.map(student=>(

                                    <option

                                    key={student._id}

                                    value={student._id}

                                    >

                                    {student.name}

                                    </option>

                                ))
                            }


                        </select>







                        <select

                        className="form-control mb-3"

                        name="course"

                        value={formData.course}

                        onChange={handleChange}

                        >


                            <option value="">
                                Select Course
                            </option>



                            {
                                courses.map(course=>(

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

                            Enroll Student

                        </button>



                    </form>


                </div>


            </div>








            <table className="table table-bordered mt-4">


                <thead className="table-dark">


                    <tr>

                        <th>
                            Student
                        </th>


                        <th>
                            Course
                        </th>


                        <th>
                            Status
                        </th>


                        <th>
                            Action
                        </th>


                    </tr>


                </thead>



                <tbody>


                {
                    enrollments.map(enrollment=>(


                    <tr key={enrollment._id}>


                        <td>

                        {
                            enrollment.student?.name
                        }

                        </td>



                        <td>

                        {
                            enrollment.course?.title
                        }

                        </td>



                        <td>

                        {
                            enrollment.status
                        }

                        </td>




                        <td>


                            <button

                            className="btn btn-danger btn-sm"

                            onClick={()=>deleteEnrollment(enrollment._id)}

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


export default Enrollment;