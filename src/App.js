import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBox from './components/SearchBox';
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <div className="header">
        <div className="header__body container">
          <span className="header__logo">Users</span>
        </div>
      </div>
      <div className="content container">
        <UserForm />
        <div className="content__list">
          <SearchBox />
          <UsersList />
        </div>
      </div>
    </div>
  );
}

export default App;
