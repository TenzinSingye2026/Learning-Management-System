import { useEffect, useState } from "react";
import API from "../services/api";


function Lesson(){


    const [lessons,setLessons] = useState([]);

    const [courses,setCourses] = useState([]);

    const [editId,setEditId] = useState(null);



    const [formData,setFormData] = useState({

        title:"",
        description:"",
        videoUrl:"",
        course:""

    });





    const getLessons = async()=>{

        try{

            const res = await API.get(
                "/lessons"
            );


            setLessons(res.data);


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

        getLessons();

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


            if(editId){


                await API.put(

                    `/lessons/${editId}`,

                    formData

                );


                setEditId(null);



            }else{


                await API.post(

                    "/lessons",

                    formData

                );


            }






            setFormData({

                title:"",
                description:"",
                videoUrl:"",
                course:""

            });



            getLessons();



        }catch(error){


            console.log(error);


        }


    };








    const editLesson=(lesson)=>{


        setEditId(lesson._id);



        setFormData({

            title:lesson.title,

            description:lesson.description,

            videoUrl:lesson.videoUrl,

            course:lesson.course._id

        });


    };








    const deleteLesson=async(id)=>{


        try{


            await API.delete(

                `/lessons/${id}`

            );



            getLessons();



        }catch(error){


            console.log(error);


        }


    };








    return(


        <div className="container mt-4">


            <h2>

                Lesson Management

            </h2>





            <div className="card mt-3">


                <div className="card-body">


                    <form onSubmit={handleSubmit}>


                        <input

                        className="form-control mb-3"

                        placeholder="Lesson Title"

                        name="title"

                        value={formData.title}

                        onChange={handleChange}

                        />







                        <textarea

                        className="form-control mb-3"

                        placeholder="Description"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        />







                        <input

                        className="form-control mb-3"

                        placeholder="Video URL"

                        name="videoUrl"

                        value={formData.videoUrl}

                        onChange={handleChange}

                        />







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


                            {

                            editId

                            ?

                            "Update Lesson"

                            :

                            "Add Lesson"

                            }



                        </button>



                    </form>



                </div>


            </div>








            <table className="table table-bordered mt-4">


                <thead className="table-dark">


                    <tr>

                        <th>
                            Lesson
                        </th>


                        <th>
                            Course
                        </th>


                        <th>
                            Video
                        </th>


                        <th>
                            Action
                        </th>


                    </tr>


                </thead>







                <tbody>


                {


                lessons.map(lesson=>(



                    <tr key={lesson._id}>


                        <td>

                            {lesson.title}

                        </td>





                        <td>

                            {lesson.course?.title}

                        </td>





                        <td>


                            <a

                            href={lesson.videoUrl}

                            target="_blank"

                            rel="noreferrer"

                            >

                            Watch

                            </a>


                        </td>







                        <td>



                            <button

                            className="btn btn-warning btn-sm me-2"

                            onClick={()=>editLesson(lesson)}

                            >

                            Edit

                            </button>







                            <button

                            className="btn btn-danger btn-sm"

                            onClick={()=>deleteLesson(lesson._id)}

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


export default Lesson;