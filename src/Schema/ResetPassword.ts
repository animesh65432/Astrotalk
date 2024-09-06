import { z } from "zod";

const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
});

export default ResetPasswordSchema;
