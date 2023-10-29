import axios from 'axios';

const REGISTER_API_BASE_URL = 'http://localhost:8080/user/signup';

class RegisterService {

    signUp(userid) {
        return axios.post(REGISTER_API_BASE_URL, userid);
    }
}

export default new RegisterService();