import axios from 'axios';

class LoginService {
	constructor() {
        //this.api_url = 'https://herd-class-api.herokuapp.com/api/';
		this.api_url = 'https://herd-backend.herokuapp.com/api/'
	}

	signIn = (data) => {
		return axios.post(this.api_url + 'login', data);
	}

	signUp = (data) => {
		return axios.post(this.api_url + 'signup', data);
	}
 }

 export default new LoginService();