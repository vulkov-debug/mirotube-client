import React, {useState, useContext} from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { Context } from "../context";

const login = () => {

    const [values, setValues] = useState({})

  const {state, dispatch} = useContext(Context)

    const handleSubmit =async (e) => {
        e.preventDefault()
  try {
    const user = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, values)
    dispatch({type:"LOGIN", payload: user})
    toast.success('Login successfull')
  } catch (error) {
      toast.error(error.response.data)
      console.log('error',error);
  }
  
    } 

  return (<>
            <h1 className="jumbotron text-center bg-primary square">Login</h1>
    <div className="container-fluid">
        <div className="row">
        </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 p-5 ">
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" required placeholder="Email" onChange={e=> setValues({...values, email: e.target.value})} value={values.email} className='form-control m-3' />
            <input type="password" required placeholder="Password" onChange={e=> setValues({...values, password: e.target.value})} value={values.password} className='form-control m-3' />
            <button type="submit" className="btn btn-primary btn-block m-3">Login</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default login;
