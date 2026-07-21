import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";


function Login(){


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const navigate = useNavigate();




    const handleLogin = async(e)=>{


        e.preventDefault();



        try{


            const response = await API.post(

                "/auth/login",

                {

                    email,

                    password

                }

            );




            localStorage.setItem(

                "token",

                response.data.token

            );



            localStorage.setItem(

                "user",

                JSON.stringify(response.data.user)

            );



            alert("Login Successful");



            navigate("/dashboard");




        }catch(error){


            alert(

                error.response?.data?.message ||

                "Login failed"

            );


        }


    };






    return(


        <div className="container mt-5">


            <div

            className="card shadow p-4 mx-auto"

            style={{maxWidth:"400px"}}

            >



                <h2 className="text-center mb-3">

                    📚 LMS Portal

                </h2>



                <p className="text-center text-muted">

                    Learning Management System

                </p>





                <form onSubmit={handleLogin}>


                    <input

                    className="form-control mb-3"

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    />





                    <input

                    className="form-control mb-3"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    />







                    <button

                    className="btn btn-primary w-100"

                    type="submit"

                    >

                        Login

                    </button>




                </form>




            </div>


        </div>


    );


}



export default Login;