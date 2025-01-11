import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [showInstructions, setShowInstructions] = useState(true); // State for modal visibility
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
      className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
      }}
    >
      {/* Instructional Modal */}
      {showInstructions && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Welcome to the App!
            </h2>
            <p className="text-gray-700 mb-4">
              Here’s how to use the app:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Enter a title for your paste in the input box.</li>
              <li>Write your content in the textarea below.</li>
              <li>Click "Create Paste" to save it.</li>
              <li>Then go to pastes section for further changes.</li>
              <li>You can also update,view,delete and on share click it converts to pdf.</li>
            </ul>
            <button
              onClick={() => setShowInstructions(false)}
              className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <div className="bg-white bg-opacity-90 shadow-4xl rounded-2xl w-full h-full p-8 flex flex-col justify-center">
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
        {/* Footer Section */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <img
            src="/images/wasi.jpeg"
            alt="Mohammed Wasiullah"
            className="w-20 h-20 rounded-full shadow-lg"
          />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Developed by</p>
            <p className="text-xl font-bold text-purple-700">Mohammed Wasiullah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
