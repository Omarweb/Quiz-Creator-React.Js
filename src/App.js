
import './App.css';
import QuizzesPage from './pages/QuizzesPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';
import EditPage from './pages/EditPage';

import AdminLayout from './layouts/AdminLayout';
import NewQuizPage from './pages/NewQuizPage';
function App() {

  return (


    <Router>

      <Routes>
        <Route element={<AdminLayout />}>
          <Route exact path='/' element={<QuizzesPage />}></Route>
          <Route exact path='/edit/:id' element={<EditPage />}></Route>
          <Route exact path='/new' element={<NewQuizPage />}></Route>
        </Route>
      </Routes>

    </Router>

  );
}

export default App;
