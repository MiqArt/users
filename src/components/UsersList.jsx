import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getUsers, removeUser, setEditing } from '../store/users';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'react-fast-compare';
import { ReactComponent as EditIcon } from '../icons/edit.svg';
import { ReactComponent as RemoveIcon } from '../icons/remove.svg';

const theadData = ["Email", "Password", "Phone", "Full Name", "Status", "Created At", "Last Change", "Actions"];

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, edit: { editing }, filter } = useSelector(state => state.users, isEqual);

  const startEditing = (data) => {
    dispatch(setEditing({ editing: true, template: data }))
  }

  const onHandleRemove = (id) => {
    dispatch(removeUser(id))
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, editing])

  return (
    <div className="users-list">
      <Table>
        <Thead className="responsiveTable__thead">
          <Tr className="responsiveTable__thead__tr">
            {theadData.map((el, index) => {
              return <Th className="responsiveTable__thead__tr__th" key={`th-${index}`}>{el}</Th>
            })}
          </Tr>
        </Thead>
        <Tbody className="responsiveTable__tbody">
          {users && users.filter(el => el.status.includes(filter)).map(el => {
            return (
              <Tr className="responsiveTable__tbody__tr" key={el.id}>
                {[
                  ...Object.keys(el).filter(x => x !== "id").map((key, index) => {
                    return (
                      <Td className="responsiveTable__tbody__td" key={`td-${index}`}>{el[key]}</Td>
                    )
                  }),
                  <Td className="responsiveTable__tbody__td" key={4}>
                    <button onClick={() => startEditing(el)} className="responsiveTable__tbody__td__btn --edit">
                      <EditIcon className="edit-btn" />
                    </button>
                    <button onClick={() => onHandleRemove(el.id)} className="responsiveTable__tbody__td__btn">
                      <RemoveIcon className="remove-btn"/>  
                    </button>
                  </Td>
                ]}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default UsersList;
