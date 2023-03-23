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
    response = await fetch(`${baseURL}/api/v2/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
  }
  if (type === 'sign-in') {
    response = await fetch(`${baseURL}/api/v2/users/sessions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
  }

  if (response.error) {
    throw response.error;
  }

  // console.log(await response.json());

  return await response.json();
}

export async function signOut() {
  await fetch(`${baseURL}/api/v2/users/sessions/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
