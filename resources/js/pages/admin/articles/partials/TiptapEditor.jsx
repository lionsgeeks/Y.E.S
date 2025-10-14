import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Listbox } from "@headlessui/react";
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
} from 'lucide-react';


const TiptapEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    "min-h-[150px] p-2 border rounded focus:outline-none prose prose-sm",
            },
        },
    });

    const [align, setAlign] = useState("left");

    if (!editor) return null;

    return (
        <div className="w-full">
            <div className="flex flex-wrap items-center gap-2 border p-2 mb-2">
                {/* Undo / Redo */}
                <button type="button" aria-label="Undo" onClick={() => editor.chain().focus().undo().run()}>
                    <Undo />
                </button>
                <button type="button" aria-label="Redo" onClick={() => editor.chain().focus().redo().run()}>
                    <Redo />
                </button>

                {/* Basic text styles */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "text-blue-600" : ""}
                >
                    <Bold />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "text-blue-600" : ""}
                >
                    <Italic />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "text-blue-600" : ""}
                >
                    <Strikethrough />
                </button>

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "text-blue-600" : ""}
                >
                    <List />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "text-blue-600" : ""}
                >
                    <ListOrdered />
                </button>

                {/* Text alignment dropdown */}
                <Listbox
                    value={align}
                    onChange={(value) => {
                        setAlign(value);
                        editor.chain().focus().setTextAlign(value).run();
                    }}
                >
                    <div className="relative">
                        <Listbox.Button className="px-2">
                            {align === "left" && <AlignLeft />}
                            {align === "center" && <AlignCenter />}
                            {align === "right" && <AlignRight />}
                            {align === "justify" && <AlignJustify />}
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 rounded border bg-white shadow">
                            {["left", "center", "right", "justify"].map((value) => (
                                <Listbox.Option
                                    key={value}
                                    value={value}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                >
                                    {value === "left" && <AlignLeft />}
                                    {value === "center" && <AlignCenter />}
                                    {value === "right" && <AlignRight />}
                                    {value === "justify" && <AlignJustify />}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>

            {/* Editable content */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
