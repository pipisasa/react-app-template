// @flow
// import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
import axios from 'axios';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    // ------------
    return true;
    // -------------
    // const decoded = jwtDecode(user.token.access);
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp > currentTime) {
    //     return true;
    // } else {
    //     console.warn('access token expired');
    //     return false;
    // }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

/**
 * Axios with auth middleware
 */

const authAxios = (a,b)=>{
    const user = getLoggedInUser()
    if(!user)return null;
    if(typeof a === 'string'){
        return axios(a,{...b,headers:{Authorization:`Bearer ${user.token.access}`}})
    }
    return axios({...a,headers:{Authorization:`Bearer ${user.token.access}`}})
}

export { isUserAuthenticated, getLoggedInUser, authAxios };