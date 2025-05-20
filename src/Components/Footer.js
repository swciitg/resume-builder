import React from 'react';
import linkedIn from '../assets/LinkedIn.png'
import facebook from '../assets/Facebook.png'
import Twitter from '../assets/Twitter.png'
import Instagram from '../assets/Instagram.png'


const Footer = ({ darkMode }) => {
    return (
        <div
            className="flex flex-col mb-0 mt-12 bottom-0"
            style={{ backgroundColor: darkMode ? '#192b45' : '#dee7f4' }}
        >
            <div className=" flex-col lg:flex-row justify-evenly  pt-8">
                <div className=" flex flex-col  lg:basis-1/3 md:flex-row md:justify-evenly md:items-center w-full">
                    <div className="font-Inter text-3xl md:text-4xl xl:text-6xl leading-tight text-center">Get in touch! <p className="hidden lg:inline">&nbsp;</p></div>
                    <div className="flex justify-around my-4 mx-6">
                        <div className="flex flex-col px-4">
                            <div className="flex text-greyuse">SWC, New SAC</div>
                            <div className="flex text-greyuse">IIT Guwahati</div>
                            <div className="flex text-greyuse">Assam 781039</div>
                        </div>
                        <div className="flex flex-col pr-4 px-4">
                            <div className="flex text-greyuse"> <a href='mailto:swc@iitg.ac.in'> swc@iitg.ac.in </a></div>
                            <div className="flex text-greyuse">+91 702 785 9553</div>
                        </div>
                    </div>
                </div>

                {/* <div className=" flex flex-col lg:flex-row justify-evenly  pt-8">
                    <div className="font-Inter text-2xl md:text-4xl xl:text-5xl md:text-center">MADE BY SWC </div>
                </div> */}
            </div>
            <div className="flex justify-center basis-1/3 mt-8 mb-6">
                <div className="flex justify-between w-4/5"
                    style={{ borderTop: darkMode?'1px solid #706e6e':'1px solid #a6a6a6'}}>
                    <div className="flex pl-3 pt-4 font-Inter font-normal text-xs leading-4 text-greyuse">© Students Web Committee</div>
                    <div className="flex pt-4">
                        <div className="flex mr-3">
                            <a href='https://www.facebook.com/swciitg/' target="_blank" rel="noopener noreferrer">
                                <img src={facebook} width={15} height={15} alt="Icon not found" />
                            </a>
                        </div>
                        <div className="flex mr-3">
                            <a href='https://www.instagram.com/swc_iitg/' target="_blank" rel="noopener noreferrer">
                                <img src={Instagram} width={15} height={15} alt="Icon not found" />
                            </a>
                        </div>
                        <div className="flex mr-3">
                            <a href='https://in.linkedin.com/company/student-s-web-committee-iitg' target="_blank" rel="noopener noreferrer">
                                <img src={linkedIn} width={15} height={15} alt="Icon not found" />
                            </a>
                        </div>
                        <div className="flex">
                            <a href='https://twitter.com/swciitghy' target="_blank" rel="noopener noreferrer">
                                <img src={Twitter} width={15} height={15} alt="Icon not found" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Footer;
