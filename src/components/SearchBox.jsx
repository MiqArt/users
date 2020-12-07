import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { getUsers, searchUsers, filterUsers } from '../store/users';

const SearchBox = () => {
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    const { value } = e.target;
    dispatch(getUsers("ALL_DATA"));
    dispatch(searchUsers(value));
  }

  const onFilter = (e) => {
    const { value } = e.target;
    dispatch(filterUsers(value));
  }

  return (
    <div className="search">
      <div className="search__search-box">
        <SearchIcon className="search__search-box__icon" />
        <input placeholder="Search" onChange={onHandleChange} className="search__search-box__input" type="text" name="" />
      </div>
      <div className="--triangle">
        <select onChange={onFilter} className="search__search-box__select" name="filter">
          <option value="">All</option>
          <option value="client">Client</option>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBox
