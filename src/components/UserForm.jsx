import React, { useEffect, useState } from 'react';
import { createUser, editUser, setEditing } from '../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import isEqual from 'react-fast-compare';
import { ReactComponent as EmailIcon } from '../icons/email.svg';
import { ReactComponent as PasswordIcon } from '../icons/password.svg';
import { ReactComponent as PhoneIcon } from '../icons/phone.svg';
import { ReactComponent as FullNameIcon } from '../icons/fullName.svg';
import { ReactComponent as StatusIcon } from '../icons/status.svg';

const initialTemplate = { email: "", password: "", phone: "", fullName: "", status: "client", createdAt: "", lastChange: "", id: "" }

const UserForm = () => {
  const [data, setData] = useState(initialTemplate);
  const { edit: { editing, template } } = useSelector(state => state.users, isEqual);

  const dispatch = useDispatch();

  const isValidForm = () => {
    const { email, password, phone, fullName } = data;
    let isFull = email && password && phone && fullName;
    if (isFull && email.includes("@") && email.includes(".")) {
      return true;
    } else if (!isFull) {
      toast.error("Please fill all fields!");
      return false;
    } else {
      toast.error("Invalid eMail!");
      return false;
    }
  }

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      dispatch(createUser({
        ...data, createdAt: new Date().toLocaleDateString('en-GB'),
        lastChange: new Date().toLocaleDateString('en-GB'), id: uuid()
      }));
      setData(initialTemplate);
    }
  }

  const cancelEditing = (e) => {
    e.preventDefault();
    dispatch(setEditing({ editing: false, template: {} }));
    setData(initialTemplate);
  }

  const onHandleEdit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      dispatch(editUser({ ...data, lastChange: new Date().toLocaleDateString('en-GB') }));
      dispatch(setEditing({ editing: false, template: {} }));
      setData(initialTemplate);
    }
  }

  useEffect(() => {
    if (editing) {
      setData(template);
    }
  }, [editing, template]);

  return (
    <form className="user-form">
      <label className="user-form__label" htmlFor="email">
        <EmailIcon className="user-form__label__icon" />
        <input onChange={onHandleChange} value={data.email} placeholder="Email" className="user-form__input" type="email" name="email" />
      </label>
      <label className="user-form__label" htmlFor="password">
        <PasswordIcon className="user-form__label__icon" />
        <input onChange={onHandleChange} value={data.password} placeholder="Password" className="user-form__input" type="password" name="password" autoComplete="on" />
      </label>
      <label className="user-form__label" htmlFor="phone">
        <PhoneIcon className="user-form__label__icon --phone" />
        <input onChange={onHandleChange} value={data.phone} placeholder="Phone" className="user-form__input" type="text" name="phone" />
      </label>
      <label className="user-form__label" htmlFor="fullName">
        <FullNameIcon className="user-form__label__icon" />
        <input onChange={onHandleChange} value={data.fullName} placeholder="Full Name" className="user-form__input" type="text" name="fullName" />
      </label>
      <label className="user-form__label" htmlFor="status">
        <StatusIcon className="user-form__label__icon" />
        <select onChange={onHandleChange} value={data.status} className="user-form__select" name="status">
          <option value="client">Client</option>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <div className="user-form__btn-group">
        {
          editing ?
            [<button onClick={onHandleEdit} className="user-form__btn-group__btn --save">Save</button>,
            <button onClick={cancelEditing} className="user-form__btn-group__btn --cancel">Cancel</button>]
            :
            <button onClick={onHandleSubmit} className="user-form__btn-group__btn --create">Create</button>
        }
      </div>
    </form>
  );
};

export default UserForm;
