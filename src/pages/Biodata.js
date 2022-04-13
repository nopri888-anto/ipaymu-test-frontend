import React, {Component} from "react";
import {Link} from'react-router-dom';

import axios from 'axios';
import swal from "sweetalert";


class Biodata extends Component
{

    state = {
        biodatas: [],
        loading: true,
    }

    async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/biodatas');
        //console.log(res);
        if(res.data.status === 200){
            this.setState({
                biodatas: res.data.biodatas,
                loading: false,
            });
        }
    }

    deleteBiodata = async(e, uuid) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting!";

        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-biodata/${uuid}`);
        if(res.data.status === 200){

            thidClickedFunda.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
        }
    }



    render(){
        var biodata_HTMLTABLE = "";
        if(this.state.loading){
            biodata_HTMLTABLE = <tr><td colSpan="7"><h4>Please wait...</h4></td></tr>
        }else{
            biodata_HTMLTABLE = this.state.biodatas.map((item,i) => {
                return (
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.nama}</td>
                    <td>{item.pekerjaan}</td>
                    <td>{item.tanggal_lahir}</td>
                    <td>
                    <Link className="btn btn-success btn-sm" to={`edit-biodata/${item.uuid}`}>Edit</Link>
                    <button type="button" onClick={(e) => this.deleteBiodata(e, item.uuid)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                    </tr>
                );
            });   
        }

        return(
            <div className="container">
                <div className="row"> 
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Biodata</h4>
                            <Link to={'add-biodata'} className="btn btn-primary btn-sm float-end">
                                Add Biodata
                            </Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped"> 
                            <thead>
                                <tr>
                                <th>No.</th>
                                    <th>Nama</th>
                                    <th>Pekerjaan</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {biodata_HTMLTABLE}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>   
        );
    }
}

export default Biodata;

//noprianto