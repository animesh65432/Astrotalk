import { z } from "zod";

const SingupSchema = z
  .object({
    name: z.string().min(8, { message: "Name is too short" }),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(8, { message: "Password is too short" }).max(256, {
      message: "it's too long",
    }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });
export default SingupSchema;
