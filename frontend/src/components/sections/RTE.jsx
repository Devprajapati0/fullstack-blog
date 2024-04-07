import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ value, onChange }) {
  return (
    <Editor
      apiKey="1uxl9s4k6i1sp542cvivyjao5h5m1wncxwk2oeozf0e4pp5g"
      value={value} // Use value prop instead of initialValue
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "image",
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "anchor",
        ],
        toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
      }}
      onEditorChange={onChange} // Use onEditorChange prop instead of onChange
    />
  );
}
