import { z } from "zod";

const UpdatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(256, { message: "Password is too long" }),
    confirmpassword: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(256, { message: "Password is too long" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });

export default UpdatePasswordSchema;
