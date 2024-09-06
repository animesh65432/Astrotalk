export type SingupTypes = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
};

export type LoginTypes = {
  email: string;
  password: string;
};

export type ResetPasswordTypes = {
  email: string;
};

export type UpdatePasswordTypes = {
  password: string;
  confirmpassword: string;
};
