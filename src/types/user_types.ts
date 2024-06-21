import { z } from 'astro/zod';

export const CreateUserFormSchema = z
  .object({
    firstName: z.string().min(1, { message: '名前を入力してください' }),
    lastName: z.string().min(1, { message: '姓を入力してください' }),
    email: z
      .string()
      .email({ message: 'メールアドレスの形式ではありません' })
      .min(1, { message: 'メールアドレスを入力してください' }),
    zipcode: z.string().min(1, { message: '郵便番号を入力してください' }),
    prefecture: z.string().min(1, { message: '都道府県を入力してください' }),
    municipalities: z
      .string()
      .min(1, { message: '市区町村を入力してください' }),
    address: z.string().min(1, { message: '住所を入力してください' }),
    telephone: z.string().min(1, { message: '電話番号を入力してください' }),
    password: z.string().min(1, { message: 'パスワードを入力してください' }),
    confirmPassword: z
      .string()
      .min(1, { message: '確認用パスワードを入力してください' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致していません',
    path: ['confirmPassword'],
  });

export type CreateUserForm = z.infer<typeof CreateUserFormSchema>;
export type CreateUserFormError = z.inferFormattedError<
  typeof CreateUserFormSchema
>;

export const UpdateUserFormSchema = z.object({
  firstName: z.string().min(1, { message: '名前を入力してください' }),
  lastName: z.string().min(1, { message: '姓を入力してください' }),
  email: z
    .string()
    .email({ message: 'メールアドレスの形式ではありません' })
    .min(1, { message: 'メールアドレスを入力してください' }),
  zipcode: z.string().min(1, { message: '郵便番号を入力してください' }),
  prefecture: z.string().min(1, { message: '都道府県を入力してください' }),
  municipalities: z.string().min(1, { message: '市区町村を入力してください' }),
  address: z.string().min(1, { message: '住所を入力してください' }),
});

export type UpdateUserForm = z.infer<typeof UpdateUserFormSchema>;
export type UpdateUserFormError = z.inferFormattedError<
  typeof UpdateUserFormSchema
>;
