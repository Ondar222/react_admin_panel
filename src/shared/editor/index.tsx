
import { useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';

export const YurtaEditor = ({ defaultValue, onChange }) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());

        }
    };

    return (
        <Editor
            apiKey='qu8gahwqf4sz5j8567k7fmk76nqedf655jhu2c0d9bhvc0as'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={defaultValue}

            init={{
                language: "ru",
                language_url: "ru.js",
                height: 500,
                root_name: "description",
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

            onEditorChange={() => onChange(editorRef.current.getContent())}
        />
    )
}