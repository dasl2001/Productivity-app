export const authenticateUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] && users[username].password === password) {
      return true;
    }
    return false;
  };
  