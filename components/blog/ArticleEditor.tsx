"use client";

import { useEffect, useRef } from "react";

interface ArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ArticleEditor({
  value,
  onChange,
  placeholder = "Tulis artikel di sini...",
}: ArticleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (quillRef.current) return;
    if (!editorRef.current) return;

    import("quill").then(({ default: Quill }) => {
      const quill = new Quill(editorRef.current!, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });

      quillRef.current = quill;
    });
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div ref={editorRef} />
      <style>{`
        @import url('https://cdn.quilljs.com/2.0.2/quill.snow.css');
      `}</style>
    </div>
  );
}
