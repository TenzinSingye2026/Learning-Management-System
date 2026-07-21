import { useNavigate } from "react-router-dom";


function Navbar(){


    const navigate = useNavigate();


    const user = JSON.parse(

        localStorage.getItem("user")

    );





    const logout = ()=>{


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/");


    };







    return(


        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">


            <div className="container-fluid">



                <span className="navbar-brand fw-bold">

                    📚 Learning Management System

                </span>





                <div className="d-flex align-items-center">



                    <span className="text-white me-3">


                        👤 {user?.name}

                        <small className="ms-2">

                            ({user?.role})

                        </small>


                    </span>






                    <button

                    className="btn btn-light btn-sm"

                    onClick={logout}

                    >

                        Logout

                    </button>





                </div>



            </div>


        </nav>


    );


}



export default Navbar;