
import React, {Component} from "react";
import {Link} from'react-router-dom';
import axios from "axios";

import swal from "sweetalert";

class AddBiodata extends Component
{
    state = {
        nama: '',
        pekerjaan: '',
        tanggal_lahir: '',
        error_list: []
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveBiodata = async(e) =>{
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/add-biodata', this.state);
        if(res.data.status === 200){
            //console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
            this.setState({
                nama: '',
                pekerjaan: '',
                tanggal_lahir: '',
            });
        }else{
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    }


    render(){
        return(
            <div className="container">
                <div className="row"> 
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Biodata</h4>
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">
                                Back
                            </Link>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.saveBiodata}>
                                <div className="form-group mb-3">
                                    <label>Nama</label>
                                    <input type="text" name="nama" onChange={this.handleInput} value={this.state.nama} className="form-control"/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Pekerjaan</label>
                                    <input type="text" name="pekerjaan" onChange={this.handleInput} value={this.state.pekerjaan} className="form-control"/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tanggal Lahir</label>
                                    <input type="text" name="tanggal_lahir" onChange={this.handleInput} value={this.state.tanggal_lahir} className="form-control"/>
                                </div>

                                <div className="form-group mb-3">
                                <button type="submit" className="btn btn-primary">Save Biodata</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default AddBiodata;

//noprianto