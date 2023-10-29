import axios from 'axios';

const LOGIN_API_BASE_URL = 'http://localhost:8080/user/signin?token=';

class LoginService {

    signIn(token) {
        console.log(LOGIN_API_BASE_URL + token);
        return axios.post(LOGIN_API_BASE_URL + token);
    }
}

export default new LoginService();