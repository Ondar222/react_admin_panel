
import { useRef, useEffect, useState } from "react"
import { Editor } from '@tinymce/tinymce-react';
// import './ru.js'
// export const Editor = ({ defaultValue, onChange }) => {
//     const [state, setState] = useState<any>()
//     const ejInstance = useRef()

//     function initEditor() {
//         const editor = new EditorJS({
//             holder: 'editorjs',
//             // data: {
//             //     blocks: []
//             // },
//             tools: EDITOR_JS_TOOLS,
//             onReady: () => {
//                 //@ts-ignore
//                 ejInstance.current = editor.blocks.renderFromHTML(defaultValue)
//             },
//             autofocus: true,
//             onChange: async () => {
//                 let content = await editor.saver.save()
//                 setState(content)
//             },

//         })

//         editor.blocks.renderFromHTML(defaultValue)
//     }

//     useEffect(() => {

//         if (ejInstance.current === null) {
//             initEditor()
//         }

//         return () => {
//             //@ts-ignore
//             // ejInstance.current.destroy()
//             ejInstance.current = null

//         }
//     }, [])

//     useEffect(() => {
//         onChange(state)
//     }, [ejInstance, state])

//     return (
//         <div id='editorjs' />
//     )
// }


export const YurtaEditor = ({ defaultValue, onChange }) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());

        }
    };

    return <>
        <Editor
            apiKey='qu8gahwqf4sz5j8567k7fmk76nqedf655jhu2c0d9bhvc0as'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"

            init={{
                language: "ru",
                language_url: "ru.js",
                height: 500,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                content_langs: [{ title: "Russian", code: "ru" }],
                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            tagName="description"
            onChange={() => {
                console.log(editorRef)
                // onChange(editorRef.current.getContent())
            }}
        />
    </>
}