import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useRouter} from 'next/router'

const register = () => {
  const [values, setValues] = useState({});
 
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        values
      );
      toast.success('Registration successfull!')
      router.push('/login')
   } catch (error) {
       console.log(error.response.data);
       toast.error(error.response.data)
   }
   
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>
      <div className="container-fluid">
        <div className="row"></div>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-5 ">
            <form className="login-form" onSubmit={handleSubmit}>
            <input
               required
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setValues({ ...values, name: e.target.value })
                }
                value={values.name}
                className="form-control m-3"
              />
              <input
              required
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                value={values.email}
                className="form-control m-3"
              />
              <input
              required
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                value={values.password}
                className="form-control m-3"
              />
              <button type="submit" className="btn btn-primary btn-block m-3">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
