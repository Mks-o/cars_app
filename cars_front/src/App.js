import './App.css';
import CarsPage from './components/pages/CarsPage';
import React, { useState } from 'react';
import Menu from './components/elements/Menu';
import NewCarForm from './components/pages/NewCarForm'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import MyRentedCars from './components/pages/MyRentedCars';
import { cars_context } from './utils/cars_repository_context';
import { cars_url } from './utils/constants';
import StatisticPage from './components/pages/StatisticPage';

const App = () => {
  const [pageAndUser, setPageAndUser] = useState({ logined_user: null, current_page: 'Login' });
  const changePage = (page) => {
    if (page === 'Logout') {
      setPageAndUser({
        logined_user: null,
        current_page: 'Login'
      })
      return;
    }
    console.log(pageAndUser.current_page, page);
    setPageAndUser({ logined_user: pageAndUser.logined_user, current_page: page })
  }
  const login = (user, page) => {
    console.log(user);
    setPageAndUser({ logined_user: user, current_page: page })
  }
  const login_submit = async (user) => {
    const url = cars_url + "login";
    await fetch((url), {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      },
      method: "POST",
      body: JSON.stringify(user)
    }).then(response => response.json()).then(data => {
      user.driver_id = data.driver_id;
      user.name = data.name;
      user.secondname = data.secondname;
      user.mail = data.mail;
      user.price = data.price;
      if (user.driver_id != null) {
        setPageAndUser({
          current_page: pageAndUser.current_page,
          logined_user: user
        })
        return true;
      }
    }).catch(res => {
      console.log(res);
      return false;
    });
    return user.driver_id != null;
  }
  function showPage(page_name) {
    let menu = <Menu key={1} />;
    switch (page_name) {
      case 'Login':
        return <Login key={2} />;
      case 'Register':
        return <Register key={3} />;
      case ('Show available cars'):
        return [menu, <CarsPage key={4} />];
      case ('Show all cars'):
        return [menu, <CarsPage key={5} />];
      case 'Add new car':
        return [menu, <NewCarForm key={6} />];
      case 'My rented cars':
        return [menu, <MyRentedCars key={7} />];
      case 'Statistic':
        return [menu, <StatisticPage key={8} />];
      default:
        break;
    }
  }
  return (
    <div className="App d-flex">
      <cars_context.Provider value={{
        changePage, login, login_submit,
        currentPage: pageAndUser.current_page,
        user: pageAndUser.logined_user
      }}>
        {showPage(pageAndUser.current_page)}
      </cars_context.Provider>
    </div>
  );
}

// {/* {pageAndUser.current_page === 'Login' && <Login />}
// {pageAndUser.current_page === 'Register' && <Register />}

// {pageAndUser.logined_user != null && <Menu />}
// {pageAndUser.logined_user != null && pageAndUser.current_page === 'Show all cars' && <CarsPage />}
// {pageAndUser.logined_user != null && pageAndUser.current_page === 'Show available cars' && <CarsPage />}
// {pageAndUser.logined_user != null && pageAndUser.current_page === 'Add new car' && <NewCarForm />}
// {pageAndUser.logined_user != null && pageAndUser.current_page === 'My rented cars' && <MyRentedCars />} */}

export default App;
