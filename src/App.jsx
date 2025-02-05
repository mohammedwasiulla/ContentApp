import './App.css';
import AdComponent from './components/AdComponent';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
// Correcting the syntax: use curly braces for defining the array of routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <AdComponent/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
