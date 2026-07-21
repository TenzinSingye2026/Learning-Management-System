import {useEffect,useState} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";



function Users(){


    const [users,setUsers] = useState([]);


    const [form,setForm] = useState({

        name:"",

        email:"",

        password:"",

        role:"student"

    });



    const [editId,setEditId] = useState(null);





    const loadUsers = async()=>{


        try{


            const response = await API.get(
                "/users"
            );


            setUsers(response.data);



        }catch(error){


            console.log(
                error.response?.data || error.message
            );


        }


    };







    useEffect(()=>{


        loadUsers();


    },[]);









    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };








    const saveUser=async()=>{


        try{


            if(editId){



                await API.put(

                    `/users/${editId}`,

                    form

                );



            }else{



                await API.post(

                    "/users/register",

                    form

                );



            }





            setForm({

                name:"",

                email:"",

                password:"",

                role:"student"

            });



            setEditId(null);


            loadUsers();



        }catch(error){


            console.log(

                error.response?.data || error.message

            );


        }


    };








    const editUser=(user)=>{


        setEditId(user._id);


        setForm({

            name:user.name,

            email:user.email,

            password:"",

            role:user.role

        });


    };









    const deleteUser=async(id)=>{


        try{


            await API.delete(

                `/users/${id}`

            );


            loadUsers();



        }catch(error){


            console.log(error);


        }


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

                        👥 User Management

                    </h2>



                    <p>

                        Manage LMS users

                    </p>







                    <div className="card shadow p-3 mb-4">


                        <h5>

                            {editId ? "Edit User" : "Add New User"}

                        </h5>




                        <div className="row">



                            <div className="col-md-3">

                                <input

                                className="form-control"

                                placeholder="Name"

                                name="name"

                                value={form.name}

                                onChange={handleChange}

                                />

                            </div>





                            <div className="col-md-3">


                                <input

                                className="form-control"

                                placeholder="Email"

                                name="email"

                                value={form.email}

                                onChange={handleChange}

                                />

                            </div>





                            <div className="col-md-2">


                                <input

                                className="form-control"

                                placeholder="Password"

                                type="password"

                                name="password"

                                value={form.password}

                                onChange={handleChange}

                                />


                            </div>







                            <div className="col-md-2">


                                <select

                                className="form-control"

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


                            </div>







                            <div className="col-md-2">


                                <button

                                className="btn btn-primary w-100"

                                onClick={saveUser}

                                >

                                    {editId ? "Update" : "Add"}

                                </button>


                            </div>




                        </div>


                    </div>









                    <table className="table table-bordered shadow">


                        <thead>


                            <tr>


                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Action</th>


                            </tr>


                        </thead>







                        <tbody>


                        {


                            users.map((user)=>(



                                <tr key={user._id}>


                                    <td>

                                        {user.name}

                                    </td>



                                    <td>

                                        {user.email}

                                    </td>




                                    <td>

                                        {user.role}

                                    </td>





                                    <td>


                                        <button

                                        className="btn btn-warning btn-sm me-2"

                                        onClick={()=>editUser(user)}

                                        >

                                            Edit

                                        </button>





                                        <button

                                        className="btn btn-danger btn-sm"

                                        onClick={()=>deleteUser(user._id)}

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



export default Users;