export interface email {
  email: string;
}

export interface code {
  resetCode: string;
}

export interface address {
  details: string;
  phone: string;
  city: string;
}

export interface newPassword extends email {
  newPassword: string;
}

export interface loginData extends email {
  password: string;
}

export interface registerData extends loginData, email {
  name: string;
  rePassword: string;
  phone: string;
}
