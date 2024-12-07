'use client';

import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Button from './Button'
import { toast } from 'react-toastify'

const Tiptap = () => {
  const [savedDocuments, setSavedDocuments] = useState<string[]>([])

  // Load saved documents from localStorage on component mount
  useEffect(() => {
    const storedDocuments = localStorage.getItem('tiptapDocuments')
    if (storedDocuments) {
      setSavedDocuments(JSON.parse(storedDocuments))
    }
  }, [])

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: true,
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  })

  const handleSave = () => {
    if (editor) {
      // Get the current editor content as HTML
      const content = editor.getHTML()
      
      // Create a new array of saved documents
      const updatedDocuments = [...savedDocuments, content]
      
      // Save to localStorage
      localStorage.setItem('tiptapDocuments', JSON.stringify(updatedDocuments))
      
      // Update state
      setSavedDocuments(updatedDocuments)

      // Optional: Show a save confirmation
      toast.success('Document saved!')
    }
  }

  return (
    <div>
      {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
      </BubbleMenu>}

      {editor && <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
      </FloatingMenu>}

      <EditorContent editor={editor} />

      <Button onSave={handleSave} />

      {/* Optional: Display saved documents */}
      <div className="mt-4">
        <h3>Saved Documents:</h3>
        {savedDocuments.map((doc, index) => (
          <div key={index} className="border p-2 mt-2 rounded-md">
            <div dangerouslySetInnerHTML={{ __html: doc }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tiptap;