import { z } from "zod";

const LogInSchema = z.object({
  email: z.string().email({ message: "invaild email" }),
  password: z
    .string()
    .min(8, { message: "it's soo sort" })
    .max(256, { message: "it's too long" }),
});

export default LogInSchema;
