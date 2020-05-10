import axios from 'axios';

class StudentService {
	constructor() {
		//this.api_url = 'https://herd-class-api.herokuapp.com/api/';
		this.api_url = 'http://localhost:9000/api/'
	}

	getStudentClass = (id) => {
		return axios.get(this.api_url + 'student-class' + '?' + id);
	}

	saveStudentClass = (data) => {
		return axios.post(this.api_url + 'student-class', data);
	}
	deleteStudentClass = (id) => {
		return axios.delete(this.api_url + 'student-class' + '/' + id);
	}
 }

 export default new StudentService();