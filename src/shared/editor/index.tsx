
import { FC, useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';
import { YurtaEditorT } from "./types";

export const YurtaEditor: FC<YurtaEditorT> = ({ value, onChange }: { value?: string, onChange?: any }) => {
    const editorRef = useRef(null);

    return (
        <Editor
            tinymceScriptSrc={'/tinymce/tinymce.min.js'}
            
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={value}

            init={{
                language: "ru",
                language_url: "ru.js",
                height: 500,
                root_name: "description",
                promotion: false,
                branding: false,
                help_accessibility: false,
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
            onChange={() => onChange(editorRef.current.getContent())}
        />
    )
}