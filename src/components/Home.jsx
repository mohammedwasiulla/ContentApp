import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste?.title || '');
      setValue(paste?.content || '');
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`, // Replace with your desired 3D image URL
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl w-full h-full p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">
          {pasteId ? "Update Your Paste" : "Create a New Paste"}
        </h1>
        <div className="flex flex-col gap-5 w-full max-w-4xl mx-auto">
          <input
            className="p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={value}
            placeholder="Enter Content"
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
          <button
            onClick={createPaste}
            className="bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-all"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
