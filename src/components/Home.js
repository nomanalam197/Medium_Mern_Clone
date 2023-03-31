import React from 'react'
import HomeCss from "../Stylesheets/Style.module.css"
import logobar from "../assets/line-chart-line.svg";
import portrait from "../assets/image-edit-fill.png";
import bookmark from "../assets/bookmark-line.png";
import Navbar from "./Navbar"

import { asyncSaveUnsave } from '../store/userActions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const imageClick = (id) => {
        dispatch(asyncSaveUnsave({ id: id }))
    }

    return (
        <div className={HomeCss.main}>
            <Navbar></Navbar>
            <div className={HomeCss.content}>
                <div className={HomeCss.firstc}></div>
                <div className={HomeCss.secondc}>
                    <div className={HomeCss.secondc_content}>
                        <h3>Stay Curious.</h3>
                        <h4>Discover stories, thinking, and expertise<br /> from writers on any topic.</h4>
                        <div className={HomeCss.start}>
                            <h5>Start reading</h5>
                        </div>
                    </div>
                </div>
                <div className={HomeCss.thirdc}></div>
            </div>
            <div className={HomeCss.second}>
                <div className={HomeCss.firsts}>
                    <img src={logobar} alt="" /> <h5>Trending On Medium</h5>
                </div>
                <div className={HomeCss.seconds}>
                    <div className="cardslot">
                        <div className="card">
                            <div className="oneca">
                                <h1>01</h1>
                            </div>
                            <div className="twoca">
                                <div className="twocafirst">
                                    <img src={portrait} alt="" />
                                    <h6>Tom Cooper</h6>
                                </div>
                                <div className="twocasecond">
                                    <h5>Ukraine War, 24 March 2023</h5>
                                    <p>Mar 28 . 7 min read ✨</p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="oneca">
                                <h1>02</h1>
                            </div>
                            <div className="twoca">
                                <div className="twocafirst">
                                    <img src={portrait} alt="" />
                                    <h6>Dan Foster
                                        in
                                        Backyard Church</h6>
                                </div>
                                <div className="twocasecond">
                                    <h5>1200 People Were Asked Why They Left Christianity</h5>
                                    <p>Dec 29 . 7 min read ✨</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardslot">
                        <div className="card">
                            <div className="oneca">
                                <h1>03</h1>
                            </div>
                            <div className="twoca">
                                <div className="twocafirst">
                                    <img src={portrait} alt="" />
                                    <h6>
                                        The PyCoach
                                        in
                                        Artificial Corner</h6>
                                </div>
                                <div className="twocasecond">
                                    <h5>You’re Using ChatGPT Wrong! Here’s How to Be<br /> Ahead of 99% of ChatGPT Users</h5>
                                    <p>Apr 28 . 7 min read ✨</p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="oneca">
                                <h1>04</h1>
                            </div>
                            <div className="twoca">
                                <div className="twocafirst">
                                    <img src={portrait} alt="" />
                                    <h6>
                                        Arthur Hayes
                                        in
                                        Entrepreneur's Handbook</h6>
                                </div>
                                <div className="twocasecond">
                                    <h5>Kaiseki</h5>
                                    <p>Jan 12 . 7 min read ✨</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardslot">
                        <div className="card">
                            <div className="oneca">
                                <h1>05</h1>
                            </div>
                            <div className="twoca">
                                <div className="twocafirst">
                                    <img src={portrait} alt="" />
                                    <h6>Matt Chapman
                                        in
                                        Towards Data Science</h6>
                                </div>
                                <div className="twocasecond">
                                    <h5>The portfolio that got me a Data Scientist job.</h5>
                                    <p>Nov 21 . 7 min read ✨</p>
                                </div>

                            </div>
                        </div>
                        <div className="card">
                            <div className="oneca">
                                <h1>06</h1>
                            </div>
                            <div className="twoca">
                                <div className="twocafirst">
                                    <img src={portrait} alt="" />
                                    <h6>
                                        Guodong (Troy) Zhao
                                        in
                                        Bootcamp</h6>
                                </div>
                                <div className="twocasecond">
                                    <h5>A step-by-step guide to building a chatbot<br/> based on your own documents with GPT</h5>
                                    <p>Jul 18 . 7 min read ✨</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={HomeCss.third}>
                <div className={HomeCss.contentt}>
                    <div className={HomeCss.firstt}>

                        {user &&
                            user.blogs &&
                            user.blogs.map((blog) => (

                                <div className={HomeCss.contentfirstt} key={blog._id}>
                                    <div className={HomeCss.cfirst} >
                                        <div className={HomeCss.cfirstone}>
                                            <div className={HomeCss.circlet}></div>
                                            <h6>{blog.author.name}</h6>
                                        </div>
                                        <div className={HomeCss.cfirsttwo}>

                                            <h2>
                                                {(blog.data.substring(blog.data.indexOf("<h2>"), blog.data.indexOf("</h2>"))).substring(4, 20)
                                                    || "Heading not available of Blog."}
                                            </h2>
                                            <p>
                                                {(blog.data.substring(blog.data.indexOf("<p>"), blog.data.indexOf("</p>"))).substring(3, 20)
                                                    || "Data not available of Blog."}
                                            </p>
                                            <div className={HomeCss.cfirsttwoimgp}>
                                                <p>{(blog.createdAt).substring(0, 10)}
                                                    · 9 min read</p>
                                                <img onClick={() => imageClick(`${blog._id}`)} src={bookmark} alt="" />

                                            </div>
                                        </div>
                                    </div>
                                    <div className={HomeCss.csecond}>
                                        <div className={HomeCss.imgt}>
                                            <img src={
                                                (blog.data.substring(blog.data.indexOf("src="), blog.data.indexOf("/>"))).substring(4)
                                                || "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            }
                                                alt="" />
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className={HomeCss.secondt}>
                        <div className={HomeCss.firstse}>
                            <h5>DISCOVER MORE OF WHAT MATTERS TO YOU</h5>
                        </div>
                        <div className={HomeCss.secondse}>
                            <div className={HomeCss.containerone}>
                                <div className={HomeCss.box}>Programming</div>
                                <div className={HomeCss.box}>Data Science</div>
                                <div className={HomeCss.box}>Technology</div>
                            </div>
                            <div className={HomeCss.containertwo}>
                                <div className={HomeCss.box}>Self Improvement</div>
                                <div className={HomeCss.box}>Writing</div>
                                <div className={HomeCss.box}>Relationships</div>
                            </div>
                            <div className={HomeCss.containerthree}>
                                <div className={HomeCss.box}>Machine Learning</div>
                                <div className={HomeCss.box}>Productivity</div>
                                <div className={HomeCss.box}>Politics</div>
                            </div>
                        </div>
                        <div className={HomeCss.thirdse}>
                            <p>Help  Status  Writers  Blog  Careers  Privacy Terms  About  Text To Speech</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home