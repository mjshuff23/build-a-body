import React from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import *  as FaIcons from "react-icons/fa";
import *  as AiIcons from "react-icons/ai";
import *  as RiIcons from "react-icons/ri";
import *  as GiIcons from "react-icons/gi";


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'navBar__text'
    },
    {
        title: 'Exercises',
        path: '/exercises',
        icon: <GiIcons.GiWeightLiftingUp />,
        className: 'navBar__text'
    },
    {
        title: 'Workouts',
        path: '/workouts',
        icon: <RiIcons.RiBookletFill />,
        className: 'navBar__text'
    },
];
