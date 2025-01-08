import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import CourseContent from './components/pages/CourseContent';
import MyAccount from './components/pages/MyAccount';
import CreateCourse from './components/instructor/pages/CreateCourse';
import AddVideo from './components/instructor/pages/AddVideo';
import MyCourses from './components/instructor/pages/MyCourses';
import CourseVideos from './components/instructor/pages/CourseVideos';
import CourseVideo from './components/instructor/pages/CourseVideo';
import QnA from './components/QnA';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course_content" element={<CourseContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/myaccount" element={<MyAccount />} />

          {/* Instructor Routes */}
          <Route path="/instructor/mycourses" element={<MyCourses />} />
          <Route path="/instructor/create_course" element={<CreateCourse />} />
          <Route path="/instructor/course_videos" element={<CourseVideos />} />
          <Route path="/instructor/course_video" element={<CourseVideo />} />
          <Route path="/instructor/add_video" element={<AddVideo />} />

          <Route path="/qna" element={<QnA />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
