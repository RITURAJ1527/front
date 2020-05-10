import React, { Component } from 'react';

import StudentService from '../../service/student-service';
import AppLoader from '../loader/loader';

import './Home.css';
import Navbar from '../Navbar';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avblClasses: [],
      selectedClasses: [],
      loading: true,
      message: 'Loading Data. Please wait...',
      selectedClass: '',
      subscribedStudents: []
    }
  }

  componentDidMount() {
    this.getSelectedClass();
  }

  getSelectedClass = () => {
    let updatedState = { ...this.state };
    updatedState.loading = true;
    this.setState(updatedState);
    const query = 'studentId=' + localStorage.getItem('email')
    StudentService.getStudentClass(query)
      .then(res => {
        console.log(res.data);
        updatedState.loading = false;
        updatedState.selectedClasses = res.data.data;
        updatedState.selectedClass = '';
        this.setState(updatedState, () => {
          this.createClassList();
        });
      });
  }

  createClassList = () => {
    let updatedState = { ...this.state };
    updatedState.avblClasses = [];
    for (let i = 0; i < 10; i++) {
      updatedState.avblClasses.push(
        {
          name: 'CLass ' + (i + 1),
          classId: '' + (i + 1)
        }
      )
      updatedState.selectedClasses.forEach(item => {
        updatedState.avblClasses.forEach((d, i) => {
          if (d.classId === item.classId) {
            updatedState.avblClasses.splice(i, 1);
          }
        })
      })
      this.setState(updatedState);

    }
  }

  saveClass = (data) => {
    console.log(data);
    if (this.state.avblClasses.length <= 5) {
      window.alert("You have already reached the maximum limit of 5.")
    }
    else {
      const user = JSON.parse(sessionStorage.getItem('user'));
      let updatedState = { ...this.state };
      updatedState.loading = true;
      updatedState.message = "Saving data. Please wait... If it takes too long, please refresh your page or check or connection."
      this.setState(updatedState);
      const _id = '' + Math.floor(1000 + Math.random() * 9000)
      StudentService.saveStudentClass({ ...data, studentId: localStorage.getItem('email'), _id: _id, studentName: user.name })
        .then(res => {
          console.log(res.data);
          this.getSelectedClass();
        })
    }
  }

  deleteClass = (data) => {
    let updatedState = { ...this.state };
    updatedState.loading = true;
    updatedState.message = "Deleting data. Please wait...";
    this.setState(updatedState);
    StudentService.deleteStudentClass(data._id)
      .then(res => {
        console.log(res.data);
        this.getSelectedClass();
      });
  }

  getClassDetailsById = (data) => {
    let updatedState = { ...this.state };
    updatedState.loading = true;
    updatedState.message = "Fetching details. Please wait...";
    this.setState(updatedState);
    const query = 'classId=' + data.classId;
    StudentService.getStudentClass(query)
      .then(res => {
        updatedState.selectedClass = res.data.data[0];
        updatedState.subscribedStudents = res.data.data.map(item => {
          return {
            name: item.studentName,
            _id: item.studentId
          }
        });
        updatedState.loading = false;
        this.setState(updatedState);
      });
  }

  render() {
    const { avblClasses, selectedClasses, loading, message, selectedClass, subscribedStudents } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <div className="row" style={{ margin: '10px 0 0 0' }}>
          <div className="col-lg-4 col-md-4 col-12 home-content">
            <h4 className="text-center">Available classes for selection</h4>
            <hr />
            <div className="row">
              {
                avblClasses && avblClasses.map(item => (
                  <div className="col-sm-3" onClick={() => this.saveClass(item)} style={{ cursor: 'pointer', marginBottom: '10px' }} key={item._id}>
                    <div style={{ backgroundColor: "rgb(0,255,255)", padding: '10px' }}>
                      <h6 className="text-center">{item.name}</h6>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 home-content">
            <h4 className="text-center">Your Subscribed Classes</h4>
            <hr />
            <div className="row">
              {
                selectedClasses && selectedClasses.length > 0 && selectedClasses.map(item => (
                  <div className="col-sm-3" onClick={() => this.getClassDetailsById(item)} style={{ cursor: 'pointer' }} key={item._id}>
                    <div style={{ backgroundColor: "#ffc107", padding: '10px' }}>
                      <h6 className="text-center">{item.name}</h6>
                    </div>
                  </div>
                ))
              }
              {
                selectedClasses.length === 0 &&
                <div className="col-12">
                  <h6 className="text-center"> There is no class selected as of now </h6>
                </div>
              }
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 home-content">
            {selectedClass &&
              <React.Fragment>
                <h5 className="text-center">{selectedClass.name}</h5>
                <h6 className="text-center">
                  <button type="button" onClick={() => this.deleteClass(selectedClass)}>Unsubscribed this class</button>
                </h6>
                <hr />
                <h6 className="text-center">List of subscribed student for this class</h6>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      subscribedStudents.length > 0 && subscribedStudents.map(item => (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item._id}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </React.Fragment>
            }
          </div>
        </div>
        {
          loading && <AppLoader message={message} />
        }
      </React.Fragment>
    );
  }
}

export default Home;

