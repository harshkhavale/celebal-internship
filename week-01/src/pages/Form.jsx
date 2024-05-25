import React, { useState } from 'react';
import { locations } from '../constant';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNo: '',
        country: '',
        city: '',
        panNo: '',
        aadharNo: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMsg = '';
        if (!value) {
            errorMsg = 'This field is required';
        } else {
            if (name === 'email' && !isValidEmail(value)) {
                errorMsg = 'Invalid email format';
            }
            if (name === 'phoneNo' && !isValidPhoneNumber(value)) {
                errorMsg = 'Invalid phone number format';
            }
            if (name === 'aadharNo' && !isValidAadharNumber(value)) {
                errorMsg = 'Invalid Aadhar number format';
            }
        }
        setErrors({
            ...errors,
            [name]: errorMsg
        });
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isValidPhoneNumber = (phoneNo) => {
        const regex = /^\+?[0-9]{1,3}[ -]?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
        return regex.test(phoneNo);
    };
    

    const isValidAadharNumber = (aadharNo) => {
        const regex = /^[0-9]{12}$/;
        return regex.test(aadharNo);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                formErrors[key] = 'This field is required';
            }
        });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            navigate('/success', { state: { formData } });
        }
    };

    const selectedCountry = locations.countries.find(country => country.name === formData.country);
    const cities = selectedCountry ? selectedCountry.cities : [];

    const isFormValid = Object.values(formData).every(value => value) && Object.values(errors).every(error => !error);

    return (
        <div className="App flex justify-center">
            <div className="form p-4 shadow-md border">
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="firstName" className='text-sm text-sky-500'>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className='outline-sky-500 p-2 border-2'
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
                    </div>
              <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-sm text-sky-500'>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="username" className='text-sm text-sky-500'>Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email" className='text-sm text-sky-500'>E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='text-sm text-sky-500'>Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className='outline-sky-500 p-2 border-2 w-full'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="phoneNo" className='text-sm text-sky-500'>Phone No.</label>
                <input
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Country code + number"
                />
                {errors.phoneNo && <span className="text-red-500 text-xs">{errors.phoneNo}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="country" className='text-sm text-sky-500'>Country</label>
                <select
                  name="country"
                  id="country"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  {locations.countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="city" className='text-sm text-sky-500'>City</label>
                <select
                  name="city"
                  id="city"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.country}
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="panNo" className='text-sm text-sky-500'>Pan No.</label>
                <input
                  type="text"
                  name="panNo"
                  id="panNo"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.panNo}
                  onChange={handleChange}
                />
                {errors.panNo && <span className="text-red-500 text-xs">{errors.panNo}</span>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="aadharNo" className='text-sm text-sky-500'>Aadhar No.</label>
                <input
                  type="text"
                  name="aadharNo"
                  id="aadharNo"
                  className='outline-sky-500 p-2 border-2'
                  value={formData.aadharNo}
                  onChange={handleChange}
                />
                {errors.aadharNo && <span className="text-red-500 text-xs">{errors.aadharNo}</span>}
              </div>
              <button type="submit" className='mt-4 p-2 bg-sky-500 text-white' disabled={!isFormValid}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Form;







