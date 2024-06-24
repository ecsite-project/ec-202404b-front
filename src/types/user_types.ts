import { z } from 'astro/zod';

export const CreateUserFormSchema = z
  .object({
    firstName: z.string().min(1, { message: '名前を入力してください' }),
    lastName: z.string().min(1, { message: '姓を入力してください' }),
    email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
    // .min(1, { message: 'メールアドレスを入力してください' }),
    zipcode: z.string().regex(new RegExp('^[0-9]{3}-[0-9]{4}$'), {
      message: '- を含む半角数字7桁で入力してください',
    }),
    prefecture: z.string().min(1, { message: '都道府県を入力してください' }),
    municipalities: z
      .string()
      .min(1, { message: '市区町村を入力してください' }),
    address: z.string().min(1, { message: '住所を入力してください' }),
    telephone: z.string().min(1, { message: '電話番号を入力してください' }),
    password: z
      .string()
      .regex(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\\d)(?=.*?[!-/:-@\\[-`{-~])[!-~]{8,}$'
        ),
        {
          message:
            '英大文字・英小文字・数字・記号からなる8文字以上で設定してください',
        }
      ),
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

export const UserInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  zipcode: z.string(),
  prefecture: z.string(),
  municipalities: z.string(),
  address: z.string(),
  telephone: z.string(),
  orderHistory: z.array(z.string()),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;
