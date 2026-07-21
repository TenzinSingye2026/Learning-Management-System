import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";


function Register(){


    const navigate = useNavigate();


    const [form,setForm] = useState({

        name:"",

        email:"",

        password:"",

        role:"student"

    });




    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };







    const register=async()=>{


        try{


            await API.post(

                "/users/register",

                form

            );



            alert(
                "User registered successfully"
            );


            navigate("/");



        }catch(error){


            alert(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


    };







    return(


        <div className="container mt-5">


            <div className="card shadow p-4 mx-auto"

            style={{maxWidth:"500px"}}
            
            >


                <h2 className="mb-4 text-center">

                    Register User

                </h2>





                <input

                className="form-control mb-3"

                placeholder="Name"

                name="name"

                value={form.name}

                onChange={handleChange}

                />







                <input

                className="form-control mb-3"

                placeholder="Email"

                name="email"

                value={form.email}

                onChange={handleChange}

                />







                <input

                className="form-control mb-3"

                placeholder="Password"

                type="password"

                name="password"

                value={form.password}

                onChange={handleChange}

                />







                <select

                className="form-control mb-3"

                name="role"

                value={form.role}

                onChange={handleChange}

                >


                    <option value="admin">

                        Admin

                    </option>



                    <option value="instructor">

                        Instructor

                    </option>



                    <option value="student">

                        Student

                    </option>



                </select>







                <button

                className="btn btn-primary"

                onClick={register}

                >

                    Register

                </button>





            </div>


        </div>


    );


}



export default Register;