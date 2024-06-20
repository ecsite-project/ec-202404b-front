import { z } from 'zod';

export const CreateOrderFormSchema = z.object({
  destinationName: z.string().min(1, { message: 'お名前を入力してください' }),
  destinationEmail: z
    .string()
    .email({ message: 'メールアドレスの形式ではありません' })
    .min(1, { message: 'メールアドレスを入力してください' }),
  destinationZipcode: z
    .string()
    .min(1, { message: '郵便番号を入力してください' }),
  destinationPrefecture: z
    .string()
    .min(1, { message: '都道府県を選択してください' }),
  destinationMunicipalities: z
    .string()
    .min(1, { message: '市区町村を入力してください' }),
  destinationAddress: z.string().min(1, { message: '住所を入力してください' }),
  destinationTel: z.string().min(1, { message: '電話番号を入力してください' }),
  deliveryDate: z.string().refine(
    (date) => {
      const today = new Date();
      const sevenDaysFromToday = new Date(today);
      sevenDaysFromToday.setDate(today.getDate() + 7);
      return new Date(date) >= sevenDaysFromToday;
    },
    { message: '配達日は今日から7日後以降の日付を選択してください' }
  ),
  deliveryTime: z.string().min(1, { message: '配達時間帯を選択してください' }),
  paymentMethod: z.enum(['現金', 'クレジットカード'], {
    message: 'お支払い方法を選択して下さい',
  }),
});

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
export type CreateOrderFormError = z.inferFormattedError<
  typeof CreateOrderFormSchema
>;
