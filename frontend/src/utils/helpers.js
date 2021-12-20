// api
export const api = 'http://localhost:1000/api/v1';

// token
let token = localStorage.token;
if (!token) {
  localStorage.token = Math.random().toString(36).substr(-8);
  token = localStorage.token;
}

// headers
const headers = {
  Accept: 'application/json',
  Authorization: token
};

// post helper
export const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(`POST method error: ${e}`);
    return e;
  }
};

// get helper
export const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(`GET method error: ${e}`);
    return e;
  }
};

// put helper
export const putData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(`PUT method error: ${e}`);
    return e;
  }
};

// delete helper
export const deleteData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(`DELETE method error: ${e}`);
    return e;
  }
};
