"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'

function CreatePostPage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [duedate, setDueDate] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !duedate) {
            alert("Please complete all inputs.");
            return;      
        }

        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, duedate })
            })

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a post");
            }

        } catch(error) {
            const errorData = await res.json();
            console.error("Error creating post:", errorData);
            throw new Error("Failed to create a post");
        }
    }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h3 className="text-4xl font-bold mb-6 text-center">สร้างงานใหม่</h3>
        <hr className="mb-6 border-gray-300" />
  
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">ชื่อเรื่องงาน</label>
            <input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="ขื่องาน"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="content" className="block text-lg font-semibold mb-2">รายละเอียดงาน</label>
            <textarea
              id="content"
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="รายละเอียดงาน"
              rows="5"
            ></textarea>
          </div>
  
          <div className="mb-6">
            <label htmlFor="duedate" className="block text-lg font-semibold mb-2">กำหนดวันที่ต้องทำ</label>
            <input
              id="duedate"
              onChange={(e) => setDueDate(e.target.value)}
              type="datetime-local"
              className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition-colors text-white py-3 px-4 rounded-md text-lg font-semibold mb-4"
          >
            สร้างโพสต์
          </button>
        </form>
  
        <Link href="/" className="block text-center bg-gray-500 hover:bg-gray-600 transition-colors text-white py-3 px-4 rounded-md text-lg">
          กลับไปหน้าโพสต์
        </Link>
      </div>
    </div>
  )
  
}

export default CreatePostPage