import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
export default function SideNav() {



    return (
        <aside
            className="bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0"
        >
            <div
                className={`relative border-b dark }`}
            >
                <Link to="/" className="flex items-center gap-4 py-6 px-8">
                    <AcademicCapIcon className='inline-block relative object-cover object-center w-9 h-9 rounded-md text-white' />
                    <Typography
                        variant="h6"
                        color='white'
                    >
                        Quizzes
                    </Typography>
                </Link>



            </div>
            <div className="m-4">

                <ul className="mb-4 flex flex-col gap-1">



                    <li >
                        <NavLink to='/'>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color="light-blue"

                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <HomeIcon className='inline-block relative object-cover object-center w-5 h-5 rounded-md text-white' />
                                    <Typography
                                        color="white"
                                        className="font-medium capitalize font-bold"
                                    >
                                        Home
                                    </Typography>
                                </Button>


                            )}
                        </NavLink>
                        <NavLink to='/new'>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color="light-blue"

                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <PlusIcon className='inline-block relative object-cover object-center w-5 h-5 rounded-md text-white' />
                                    <Typography
                                        color="white"
                                        className="font-medium capitalize font-bold"
                                    >
                                        New Quiz
                                    </Typography>
                                </Button>


                            )}
                        </NavLink>
                    </li>

                </ul>

            </div>
        </aside >
    )
}
