import React, { useState, useContext } from 'react'
import { StoreContext } from '../context/ShoreContext'
import axios from "axios"
import {useNavigate} from "react-router-dom"


const Login = () => {
    const navigate = useNavigate();
  const { backendUrl,token, setToken } = useContext(StoreContext)
  const [currentState, setCurrentState] = useState('Login')
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // ======================
  // INPUT HANDLER
  // ======================
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ======================
  // SUBMIT HANDLER
  // ======================
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      let newUrl = backendUrl

      if (currentState === "Sign Up") {
        newUrl += "/api/user/register"
      } else {
        newUrl += "/api/user/login"
      }

      const response = await axios.post(newUrl, data)

      if (response.data.success) {
        setToken(response.data.token)
         localStorage.setItem("token", response.data.token)
         navigate("/");
      } else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white shadow-lg rounded-2xl p-6'
      >

        {/* Title */}
        <div className='inline-flex items-center gap-2 mb-2 mt-2'>
          <p className='text-3xl font-bold text-gray-800'>
            {currentState}
          </p>
          <hr className='border-none h-[2px] w-10 bg-orange-500 rounded-full' />
        </div>

        {/* Name */}
        {currentState === 'Login' ? null :
          <input
            name='name'
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition'
            placeholder='Name'
            required
          />
        }

        {/* Email */}
        <input
          name='email'
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition'
          placeholder='Email'
          required
        />

        {/* Password */}
        <input
          name='password'
          value={data.password}
          onChange={onChangeHandler}
          type="password"
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition'
          placeholder='Password'
          required
        />

        {/* Links */}
        <div className='w-full flex justify-between text-sm mt-[-6px] text-gray-600'>

          <p className='cursor-pointer hover:text-orange-500 transition'>
            Forgot your password?
          </p>

          {
            currentState === 'Login'
              ? (
                <p
                  onClick={() => setCurrentState('Sign Up')}
                  className='cursor-pointer text-orange-600 hover:underline'
                >
                  Create account
                </p>
              )
              : (
                <p
                  onClick={() => setCurrentState('Login')}
                  className='cursor-pointer text-orange-600 hover:underline'
                >
                  Login here
                </p>
              )
          }

        </div>

        {/* Button */}
        <button
          type="submit"
          className='w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 mt-4 rounded-lg font-medium transition'
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

      </form>

    </div>
  )
}

export default Login