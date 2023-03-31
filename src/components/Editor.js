import React from 'react'
import { createReactEditorJS } from "react-editor-js";
import { useRef, useCallback } from 'react';
import { EDITOR_JS_TOOLS } from './constants';
import { asynccreateblog, asyncloadblogs } from '../store/userActions';
import { useDispatch } from "react-redux";

import { useNavigate, Outlet } from "react-router-dom";

const ReactEditorJS = createReactEditorJS();

const Editor = () => {
    const editorjs = useRef(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleInitialize = useCallback((instance)=>{
        editorjs.current = instance;
    }, []);

    const handleSave = useCallback(async ()=>{
        const savedData = await editorjs.current.save();

        let blog = "";
        savedData.blocks.forEach((element) => {

            if (element.type === "paragraph") {
                blog += "<p>" + element.data.text + "</p>";
            }
            if (element.type === "header") {
                blog +=
                    "<h" +
                    element.data.level +
                    ">" +
                    element.data.text +
                    "</h" +
                    element.data.level +
                    ">";
            }
            if (element.type === "list") {
                blog +=
                    "<" +
                    element.data.style[0] +
                    element.type[0] +
                    "/>" +
                    element.data.items
                        .map((i) => "<li>" + i + "</li>")
                        .join("") +
                    "<" +
                    element.data.style[0] +
                    element.type[0] +
                    "/>";
            }
            if (element.type === "code") {
                blog +=
                    "<" +
                    element.type +
                    ">" +
                    element.data.code +
                    "</" +
                    element.type +
                    ">";
            }
            if (element.type === "quote") {
                blog +=
                    "<" +
                    element.type[0] +
                    ">" +
                    element.data.text +
                    "</" +
                    element.type[0] +
                    ">";
            }
            if (element.type === "image") {
                blog +=
                    "<img src=" +
                    element.data.file.url +
                    " /><figcaption>" +
                    element.data.caption +
                    "</figcaption>";
            }
        });


        navigate("/home");

        await dispatch(asynccreateblog({ data: blog }));


        await dispatch(asyncloadblogs());
    }, []);

    const handleClear = useCallback(async ()=>{
        await editorjs.current.clear();
    }, []);

  return (
    <div className='editorMain'>
        <ReactEditorJS 
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
         />

         <button className='saveEditor' onClick={handleSave}> Save </button>
         <button className='clearEditor' onClick={handleClear}> Clear </button>

    </div>
  )
}

export default Editor