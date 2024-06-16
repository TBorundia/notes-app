import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error('Please enter your name', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginTop: '60px',
                    marginRight: '10px',
                }
            });
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter valid credentials', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginTop: '60px',
                    marginRight: '10px',
                }
            });
            return;
        }

        if (!password) {
            toast.error('Please enter a password', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginTop: '60px',
                    marginRight: '10px',
                }
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginTop: '60px',
                    marginRight: '10px',
                }
            });
            return;
        }

        setError("");

        // signup api call
        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password
            });

            // handle successful registration response
            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
                toast.success('Signed up successfully', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginTop: '60px',
                        marginRight: '10px',
                    }
                });
                return;
            }
        } catch (error) {
            // handle signup error
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                toast.error('User already exists, login instead', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginTop: '60px',
                        marginRight: '10px',
                    }
                });
            } else {
                console.log(error)
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div>
            <div className='fixed top-0 left-0 right-0 z-50'>
                <Navbar />
            </div>

            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1582201942961-2e1c3e63d9b4?q=80&w=1561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="absolute inset-0 h-full w-full object-cover opacity-30 "
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to Scribbie!
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Organize your thoughts with precision and amplify your productivity. Discover a seamless way to manage all your ideas in one place.
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <h1 className="mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    Welcome to Scribbie!
                                </h1>

                                <p className="mt-4 leading-relaxed text-gray-500">
                                    Effortless notes for a more productive you every day. Enhance your workflow with intuitive, organized note-taking.
                                </p>
                            </div>

                            <form onSubmit={handleSignup} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 relative">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ?

                                            <div
                                            >
                                                <FaEyeSlash />
                                            </div>
                                            :

                                            <div>
                                                <FaRegEye />
                                            </div>
                                        }
                                    </button>
                                </div>

                                <div className="col-span-6 sm:col-span-3 relative">
                                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>

                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        id="PasswordConfirmation"
                                        name="password_confirmation"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-1 p-2 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm leading-5"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {confirmPasswordVisible ?
                                            <div
                                            >
                                                <FaEyeSlash />
                                            </div>
                                            :

                                            <div>
                                                <FaRegEye />
                                            </div>
                                        }
                                    </button>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="MarketingAccept" className="flex gap-4">
                                        <input
                                            type="checkbox"
                                            id="MarketingAccept"
                                            name="marketing_accept"
                                            className="size-5 rounded-md border border-gray-100 bg-white shadow-sm"
                                        />

                                        <span className="text-sm text-gray-700">
                                            I want to receive emails about events, product updates and company announcements.
                                        </span>
                                    </label>
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                        and
                                        <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                    </p>
                                </div>

                                {error && <p className='text-red-500 col-span-6'>{error}</p>}

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700"
                                        type="submit"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account? <span></span>
                                        <Link to="/login" className="text-gray-700 underline font-semibold">Log in</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};


export default Signup;
