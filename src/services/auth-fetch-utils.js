const baseURL = 'http://localhost:7890';

export async function getUser() {
  const resp = await fetch(`${baseURL}/api/v2/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (resp.ok) {
    const user = await resp.json();
    return user;
  }
}

export async function authUser(email, password, type) {
  let response;

  if (type === 'sign-up') {
    response = await fetch(`${baseURL}/api/v2/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
  } else {
    response = await fetch(`${baseURL}/api/v2/users/sessions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
  }

  if (response.error) {
    throw response.error;
  }
  const data = await getUser();
  return data;
}

export async function signOut() {
  await fetch(`${baseURL}/api/v2/users/sessions/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
