import { z } from "zod";

export const PeopleSchema = z.object({
    PeopleName: z.string().min(1, "Name is required"),
    MobileNo: z.string().min(1, "Mobile number is required"),
    Email: z.string().email("Invalid email address"),
    Description: z.string().optional().or(z.literal("")),
    IsActive: z.boolean().default(true).optional(),
});

export type PeopleFormValues = z.infer<typeof PeopleSchema>;

export const CategorySchema = z.object({
    CategoryName: z.string().min(1, "Name is required"),
    IsExpense: z.boolean().default(false),
    IsIncome: z.boolean().default(false),
    Description: z.string().optional().or(z.literal("")),
    IsActive: z.boolean().default(true).optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
