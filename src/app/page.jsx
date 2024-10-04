"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';

export default function Home() {
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    });
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto px-4 py-6">
  <h3 className="text-3xl font-bold text-center"></h3>
  <hr className="my-4 border-gray-300" />

  <div className="flex justify-end">
    <Link href="/create">
      <button className="bg-pink-500 hover:bg-Yellow-600 transition-colors text-white px-6 py-2 rounded shadow-md">
        สร้างโพสต์
      </button>
    </Link>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {postData && postData.length > 0 ? (
      postData.map((val) => (
        <div key={val._id} className="bg-white shadow-xl p-6 rounded-lg transform hover:scale-105 transition-transform">
          <h4 className={`text-xl font-semibold mb-2 ${val.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {val.title}
          </h4>
          <p className="text-gray-700 mb-3">{val.content}</p>
          <p className="text-sm text-gray-500">Due Date: {val.duedate}</p>
          <p className={`text-sm ${val.status === 'completed' ? 'text-green-600' : 'text-red-500'} mt-2`}>
            สถานะ: {val.status === 'completed' ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}
          </p>

          <div className="mt-4 flex items-center space-x-3">
            <button
              onClick={() => handleStatusChange(val._id, val.status === 'completed' ? 'not completed' : 'completed')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {val.status === 'completed' ? 'ทำให้ไม่เสร็จ' : 'ทำให้เสร็จ'}
            </button>

            <Link href={`/edit/${val._id}`} passHref>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
                แก้ไข
              </button>
            </Link>

            <DeleteBtn id={val._id} />
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 mt-6 p-4 bg-gray-100 rounded-lg">
        ไม่มีโพสต์ที่แสดง
      </p>
    )}
  </div>
</main>
  );
}
