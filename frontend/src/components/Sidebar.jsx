import { NavLink } from "react-router-dom";


function Sidebar(){


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const role = user?.role;



    const links = [


        {
            name:"Dashboard",
            icon:"📊",
            path:"/dashboard",
            roles:["admin","instructor","student"]
        },


        {
            name:"Users",
            icon:"👥",
            path:"/users",
            roles:["admin"]
        },


        {
            name:"Courses",
            icon:"📚",
            path:"/courses",
            roles:["admin","instructor"]
        },


        {
            name:"Enrollments",
            icon:"🎓",
            path:"/enrollments",
            roles:["admin","instructor"]
        },


        {
            name:"Lessons",
            icon:"📖",
            path:"/lessons",
            roles:["admin","instructor"]
        },


        {
            name:"Assignments",
            icon:"📝",
            path:"/assignments",
            roles:["admin","instructor"]
        },


        {
            name:"My Courses",
            icon:"📚",
            path:"/student-courses",
            roles:["student"]
        },


        {
            name:"My Assignments",
            icon:"📝",
            path:"/student-assignments",
            roles:["student"]
        },


        {
            name:"My Lessons",
            icon:"📖",
            path:"/student-lessons",
            roles:["student"]
        }


    ];




    return(


        <div className="bg-dark p-3 vh-100">


            <h5 className="text-white mb-4">

                🚀 LMS Portal

            </h5>




            <p className="text-secondary small">

                Role: {role}

            </p>





            <ul className="nav flex-column">


                {

                    links

                    .filter((link)=>

                        link.roles.includes(role)

                    )


                    .map((link,index)=>(



                        <li

                        className="nav-item mb-2"

                        key={index}

                        >




                            <NavLink

                            to={link.path}

                            className={({isActive})=>

                                isActive

                                ?

                                "nav-link bg-primary text-white rounded fw-bold"

                                :

                                "nav-link text-white"

                            }

                            >


                                {link.icon} {link.name}


                            </NavLink>




                        </li>


                    ))


                }


            </ul>




        </div>


    );


}



export default Sidebar;