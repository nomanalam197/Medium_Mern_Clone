
import React from 'react'
import HomeLCss from "../Stylesheets/HomeL.module.css"
import logobar from "../assets/line-chart-line.svg";
import portrait from "../assets/image-edit-fill.png";
import bookmark from "../assets/bookmark-line.png";
import closeS from "../assets/close-line.png"
import logoH from '../assets/7079377_medium_medium logo_icon.png'
import twitterH from "../assets/twitter-fill.png"
import greater from '../assets/greater-than-symbol.png'
import plus from '../assets/plus.png'
import Navbartwo from './Navbartwo'

import HomeCss from "../Stylesheets/Style.module.css"
import { asyncSaveUnsave } from '../store/userActions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
const Stories = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const imageClick = (id) => {
        dispatch(asyncSaveUnsave({ id: id }))
    }

    return (
        <><Navbartwo />
            <div id='profile'>

                <div className="block">

                    <div className="profileLeft" style={{ marginRight: "25vmax", marginBottom: "4vh", position: "relative" }}>
                        <h1>Your Stories</h1>



                        <a href="">Draft</a>
                        <a href="">Publish</a>
                        <a href="">Responeses</a>
                        <hr />
                        <div className="writeRight resWright">
                            <div className="writePublish" style={{ marginRight: "10px" }}>Write</div>
                            <div className="writePublish" style={{ backgroundColour: "#fff" }}>Import</div>

                        </div>

                    </div>

                    <div className={HomeLCss.firstt} style={{ marginBottom: "2vh" }}>

                        {user &&
                            user.blogs &&
                            user.user.stories.map((blog) => (

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

                </div>
                <div className={HomeLCss.secondt}>
                    <div className={HomeLCss.firstse}>
                        <h4>Get unlimited access.</h4>
                    </div>
                    <div className={HomeLCss.secondse}>
                        <h4>Staff Picks</h4>
                        <div className={`${HomeLCss.containeron} ${HomeLCss.smalldata}`}>
                            <div className={HomeLCss.nametag}>
                                <div className={HomeLCss.smallCir}></div>
                                <h5>Clive Thompson</h5>
                            </div>
                            <div className={HomeLCss.detailsC}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.
                            </div>
                        </div>
                        <div className={`${HomeLCss.containertw} ${HomeLCss.smalldata}`}>
                            <div className={HomeLCss.nametag}>
                                <div className={HomeLCss.smallCir}></div>
                                <h5>Clive Thompson</h5>
                            </div>
                            <div className={HomeLCss.detailsC}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.
                            </div>
                        </div>
                        <div className={`${HomeLCss.containerthr} ${HomeLCss.smalldataee}`}>
                            <div className={HomeLCss.nametag}>
                                <div className={HomeLCss.smallCir}></div>
                                <h5>Clive Thompson</h5>
                            </div>
                            <div className={HomeLCss.detailsC}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.
                            </div>
                        </div>
                        <p className={HomeLCss.more}>See the full list</p>
                    </div>
                    <div className={HomeLCss.thirdse}>
                        <div className={HomeLCss.crossS}>
                            <img src={closeS} alt="" />
                        </div>
                        <div className={HomeLCss.heading}>
                            <h2>Writting on Medium</h2>
                        </div>
                        <div className={HomeLCss.contentTse}>
                            <h3>New writer FAQ <br />
                                Expert writing advice <br />
                                Grow your readership
                            </h3>
                            <div className={HomeLCss.smallrectangle}>
                                Start Writting
                            </div>
                        </div>
                    </div>
                    <div className={HomeLCss.fourse}>
                        <div className={HomeLCss.onefo}>
                            <img className={HomeLCss.logoHC} src={logoH} alt="" /> <p>+</p> <img src={twitterH} alt="" />
                        </div>
                        <div className={HomeLCss.twofo}>
                            <p>Discover Medium writers you <br /> already follow on Twitter.</p>
                        </div>
                        <div className={HomeLCss.threefo}>
                            <div className={HomeLCss.smallthreefo}>
                                <img src={twitterH} alt="" />
                                <p>Connect To Twitter</p>
                            </div>
                            <u><p>Maybe Later</p></u>
                        </div>
                    </div>
                    <div className={HomeLCss.secondBox}>
                        <div className={HomeLCss.firstSet}>
                            <h5>DISCOVER MORE OF WHAT MATTERS TO YOU</h5>
                        </div>
                        <div className={HomeLCss.secondSet}>
                            <div className={HomeLCss.containerone}>
                                <div className={HomeLCss.box}>Self Improvement</div>
                                <div className={HomeLCss.box}>Writing</div>
                            </div>
                            <div className={HomeLCss.containertwo}>
                                <div className={HomeLCss.box}>Relationships</div>
                                <div className={HomeLCss.box}>Machine Learning</div>
                            </div>
                            <div className={HomeLCss.containerthree}>
                                <div className={HomeLCss.box}>Business</div>
                                <div className={HomeLCss.box}>Python</div>
                            </div>
                        </div>
                       
                    </div>
                    <div className={HomeLCss.fifthse}>
                        <h4>Reading List</h4>
                        <p>Click the <img src={bookmark} alt="" /> on any story to easily add it to your reading list or a custom list that you can share</p>
                        <p className={HomeLCss.fifthP}>Help Status Writers Blog Careers Privacy Terms About Text to speech</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Stories