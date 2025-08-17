const API_URL = process.env.API_URL || 'http://192.168.1.19:8087/api/v1';

export interface CreateUserPayload {
  nama: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  code: number;
  status: string;
  data: {
    id_user: string;
    nama: string;
    email: string;
    password: string;
  };
  message: string;
}

export async function createUser(payload: CreateUserPayload): Promise<CreateUserResponse> {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      code: 500,
      status: 'error',
      data: {
        id_user: '',
        nama: '',
        email: '',
        password: '',
      },
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  code: number;
  status: string;
  data?: string;
  message: string;
}

export async function loginUser(payload: LoginUserPayload): Promise<LoginUserResponse> {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      code: 500,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
