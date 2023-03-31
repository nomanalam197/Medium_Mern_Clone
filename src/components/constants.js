import Embed from "@editorjs/embed"
import List from "@editorjs/list"
import code from "@editorjs/code"
import SimpleImage from "@editorjs/simple-image"
import Image from "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: ["link"],
        config: {
            placeholder: "Enter a header",
            levels: [1,2,3,4,5,6],
            deafaultLevel: 1
        }
    },
    list: {
        class: List,
        inlineToolbar: ["link", "bold"],
        config: {
            defaultStyle: "unordered"
        },
    },
    embed: {
        class: Embed,
        inlineToolbar: false,
        config: {
            services: {
                youtube: true,
            },
        },
    },
    code: code,
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: "http://localhost:3030/uploadBlog",
            },
            field: "blog",
            type: "image/*"

        },
    },
    SimpleImage: SimpleImage,
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: "Enter a quote.",
            captionPlaceholder: "Quote's author"
        }
    }
}

