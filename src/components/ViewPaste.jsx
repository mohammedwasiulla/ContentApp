import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id) || { title: '', content: '' }; // Fallback if paste not found

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">View Paste</h1>

        <div className="flex flex-col gap-5">
          <input
            className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter title here"
            value={paste.title}
            disabled
          />

          <textarea
            className="p-4 rounded-lg border border-gray-300 w-full h-60 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={paste.content}
            placeholder="Enter content"
            disabled
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
