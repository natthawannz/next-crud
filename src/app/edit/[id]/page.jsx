"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EditPostPage({ params }) {

    const { id } = params;

    const [postData, setPostData] = useState("");
    
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            console.log("Edit post: ", data);
            setPostData(data);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [id]);

   
    useEffect(() => {
        if (postData?.post) {
            setNewTitle(postData.post.title);
            setNewContent(postData.post.content);
            setNewDueDate(postData.post.duedate); 
        }
    }, [postData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newContent, newDueDate })
            })

            if (!res.ok) {
                throw new Error("Failed to update post")
            }

            router.refresh();
            router.push("/");

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
          <h3 className="text-4xl font-bold text-center mb-6">อัพเดทสถานะ</h3>
          <hr className="mb-6 border-gray-300" />
          
          <div className="flex justify-center mb-6">
            <Link href="/" className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">
              กลับ
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg">
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-semibold mb-2">ชื่อเรื่อง</label>
              <input 
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
                id="title"
                className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                value={newTitle}
              />
            </div>
      
            <div className="mb-4">
              <label htmlFor="content" className="block text-lg font-semibold mb-2">เนื้อหา</label>
              <textarea 
                onChange={(e) => setNewContent(e.target.value)} 
                id="content"
                className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                value={newContent}
                rows="6"
              ></textarea>
            </div>
      
            <div className="mb-4">
              <label htmlFor="duedate" className="block text-lg font-semibold mb-2">วันที่กำหนด</label>
              <input 
                onChange={(e) => setNewDueDate(e.target.value)} 
                type="datetime-local"
                id="duedate"
                className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                value={newDueDate}
              />
            </div>
      
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="bg-pink-500 hover:bg-pink-600 transition-colors text-white py-3 px-8 rounded-md text-lg font-semibold">
                แก้ไข
              </button>
            </div>
          </form>
        </div>
      )
    }      

export default EditPostPage
