import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

const Paste = () => {
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US');

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes({ id: pasteId }));
    toast.success('Paste Deleted Successfully');
  }

  const handleShare = (paste) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const lineHeight = 10;
    let cursorY = margin;

    // Title
    doc.setFontSize(14);
    doc.text(`Title: ${paste.title}`, margin, cursorY);
    cursorY += lineHeight;

    // Content
    doc.setFontSize(12);
    const splitContent = doc.splitTextToSize(
      paste.content,
      doc.internal.pageSize.width - 2 * margin
    );

    splitContent.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    // Date
    if (cursorY + lineHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
    doc.text(`Date: ${today}`, margin, cursorY);

    // Save the PDF
    doc.save(`${paste.title}.pdf`);
    toast.success('PDF Created and Ready to Share');
  };

  const handleView = (pasteId) => {
    navigate(`/pastes/${pasteId}`);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1533048301777-2b1415d2ac36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl w-[90%] max-w-5xl p-8 mt-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">My Pastes</h1>

        <input
          className="p-3 rounded-lg border border-gray-300 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-600"
          type="search"
          placeholder="Search pastes by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col gap-4"
              >
                <p className="text-sm text-gray-500">{today}</p>
                <h3 className="text-lg font-semibold text-gray-800">{paste.title}</h3>
                <p className="text-gray-600">{paste.content}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <a
                    href={`/?pasteId=${paste?._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => handleView(paste._id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(paste._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to clipboard');
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                    onClick={() => handleShare(paste)}
                  >
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No pastes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
