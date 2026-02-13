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

export const ProjectSchema = z.object({
    name: z.string().min(1, "Project Name is required"),
    description: z.string().optional().or(z.literal("")),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    isActive: z.boolean().default(true).optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;

export const IncomeSchema = z.object({
    params: z.object({
        amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a positive number",
        }),
        date: z.date({
            required_error: "Date is required",
            invalid_type_error: "Date is invalid",
        }),
        categoryId: z.string().min(1, "Category is required"),
        subCategoryId: z.string().optional(),
        projectId: z.string().optional(),
        personId: z.string().optional(),
        description: z.string().optional(),
    })
});
// Simplify for form usage (flat structure is easier for react-hook-form)
export const BaseIncomeSchema = z.object({
    Amount: z.string().min(1, "Amount is required"),
    IncomeDate: z.date(),
    IncomeDetail: z.string().min(1, "Title is required"),
    CategoryID: z.string().min(1, "Category is required"),
    SubCategoryID: z.string().optional(),
    ProjectID: z.string().optional(),
    PeopleID: z.string().optional(),
    Description: z.string().optional(),
});
export type IncomeFormValues = z.infer<typeof BaseIncomeSchema>;


export const BaseExpenseSchema = z.object({
    Amount: z.string().min(1, "Amount is required"),
    ExpenseDate: z.date(),
    ExpenseDetail: z.string().min(1, "Title is required"),
    CategoryID: z.string().min(1, "Category is required"),
    SubCategoryID: z.string().optional(),
    ProjectID: z.string().optional(),
    PeopleID: z.string().optional(),
    Description: z.string().optional(),
});
export type ExpenseFormValues = z.infer<typeof BaseExpenseSchema>;
