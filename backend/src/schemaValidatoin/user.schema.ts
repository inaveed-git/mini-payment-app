import { email, z } from "zod";



export const signUpSchema = z.object({



    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().optional(),
    userName: z.string().min(1, "User name is required"),
    email: z.string().email("Inavalid email address"),
    password: z.string().min(6, "6 latters are required")

})


export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "password must be atleast 6 latters")

})


export const updateUserFirstLastName = z.object({
    firstName: z.string(),
    lastName: z.string()


})