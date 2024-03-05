// this file to end point of the controller user function:
// i means of the end point is the roles of the all function
//i means of role is (the user can be use this function)

import { role } from "../../middlewear/auth.js";

export const endPoint ={
    getPost:[role.Admin],
}
