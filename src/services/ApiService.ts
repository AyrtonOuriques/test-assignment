interface UsersResponse {
  users: User[];
  total_pages: number;
  page: number;
}

export interface Position{
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

const url = process.env.VUE_APP_API_URL;

export async function getPositions(): Promise<Position[]> {
  const response = await fetch(`${url}/positions`);
  if (!response.ok) throw new Error('Failed to fetch positions');
  const data  = await response.json();
  return data.positions;
}

export async function getUsers(page = 1): Promise<UsersResponse> {
  const response = await fetch(`${url}/users?page=${page}&count=6`);
  if (!response.ok) throw new Error('Failed to fetch users');
  const data = await response.json();
  return data;
}

async function getToken(): Promise<string> {
  const response = await fetch(`${url}/token`);
  if (!response.ok) throw new Error('Failed to fetch token');
  const data = await response.json();
  return data.token;
}

export async function postUser(formData: FormData): Promise<object> {
  const token  = await getToken();

  const response = await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      "Token": token
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  const data = await response.json();
  return data;
}
