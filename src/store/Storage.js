import { toast } from "react-toastify";

export default class Storage {
  static setItem(key, item) {
    try {
      const list = this.getData(key);
      list.push(item);
      const value = JSON.stringify(list);
      localStorage.setItem(key, value);
      toast.success("Added successfully.")
    } catch (err) {
      toast.error(err.message)
    };
  };
  static getData(key) {
    try {
      const response = localStorage.getItem(key);
      const data = JSON.parse(response) || [];
      return data;
    } catch (err) {
      toast.error(err.message)
    };
  };
  static editItem(key, id, newInfo) {
    try {
      const data = this.getData(key);
      const newData = data.map(el => el.id === id ? { ...el, ...newInfo } : el)
      const value = JSON.stringify(newData);
      localStorage.setItem(key, value);
      toast.success("Updated successfully.")
    } catch (err) {
      toast.error(err.message)
    };
  };
  static removeItem(key, id) {
    try {
      const data = this.getData(key);
      const newData = data.filter(el => el.id !== id);
      if (data.length === newData.length) {
        toast.error("User does not exist!");
      } else {
        const value = JSON.stringify(newData);
        localStorage.setItem(key, value);
        toast.success("Deleted successfully.");
      }
    } catch (err) {
      toast.error(err.message)
    };
  };
};

