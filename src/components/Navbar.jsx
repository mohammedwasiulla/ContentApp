import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setInitialPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    setIsDragging(true);
  };

  const drag = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - initialPosition.x,
        y: e.clientY - initialPosition.y,
      });
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="absolute bg-purple-700 shadow-lg p-4 w-full z-10"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="flex flex-row justify-center gap-9">
        <NavLink 
          to="/" 
          className="text-white font-medium hover:text-blue-400 transition duration-300"
        >
          Home
        </NavLink>
        <NavLink 
          to="/pastes" 
          className="text-white font-medium hover:text-blue-400 transition duration-300"
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
