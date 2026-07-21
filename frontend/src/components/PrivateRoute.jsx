import { Navigate } from "react-router-dom";


function PrivateRoute({children, roles}){


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    if(!user){

        return <Navigate to="/" />;

    }





    if(roles && !roles.includes(user.role)){


        return <Navigate to="/dashboard" />;


    }





    return children;


}



export default PrivateRoute;