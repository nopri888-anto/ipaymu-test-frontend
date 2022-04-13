
import React, {Component} from "react";
import {Link} from'react-router-dom';
import axios from "axios";
import swal from "sweetalert";

class EditBiodata extends Component
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

    async componentDidMount(){
        const bio_id = this.props.match.params.uuid;
        // console.log(bio_id);
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-biodata/${bio_id}`);
        if(res.data.status === 200){
            this.setState({
                nama : res.data.biodata.nama,
                pekerjaan : res.data.biodata.pekerjaan,
                tanggal_lahir : res.data.biodata.tanggal_lahir,
            });
        }else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
              });

              this.props.history.push('/');
        }
    }

    updateBiodata = async (e) =>{
        e.preventDefault();
        const prod_id = this.props.match.params.uuid;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-biodata/${prod_id}`, this.state);
        if(res.data.status === 200)
        {
            //console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
              this.props.history.push('/');
            // document.getElementById('updatebtn').disabled = false;
            // document.getElementById('updatebtn').innerText = "Update Product";
            
        }else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
              });

              this.props.history.push('/');
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
                            <h4>Edit Biodata</h4>
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">
                                Back
                            </Link>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.updateBiodata}>
                                <div className="form-group mb-3">
                                    <label>Nama</label>
                                    <input type="text" name="nama" onChange={this.handleInput} value={this.state.nama} className="form-control"/>
                                    <span className="text-danger">{this.state.error_list.nama}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Pekerjaan</label>
                                    <input type="text" name="pekerjaan" onChange={this.handleInput} value={this.state.pekerjaan} className="form-control"/>
                                    <span className="text-danger">{this.state.error_list.pekerjaan}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tanggal Lahir</label>
                                    <input type="text" name="tanggal_lahir" onChange={this.handleInput} value={this.state.tanggal_lahir} className="form-control"/>
                                    <span className="text-danger">{this.state.error_list.tanggal_lahir}</span>
                                </div>

                                <div className="form-group mb-3">
                                <button type="submit" id="updatebtn" className="btn btn-primary" value="">Update Biodata</button>
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

export default EditBiodata;

//noprianto