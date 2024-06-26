import { z } from 'astro/zod';
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.number(),
  total_price: z.number(),
  order_date: z.string(),
  destination_name: z.string().default(''),
  destination_email: z.string().email(),
  destination_zipcode: z.string(),
  destination_prefecture: z.string(),
  destination_municipalities: z.string(),
  destination_address: z.string(),
  destination_tel: z.string(),
  delivery_date: z.string(),
  delivery_time: z.string(),
  payment_method: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
export const OrderListSchema = z.array(OrderSchema);

export enum TimeRange {
  RANGE_8_10 = '8:00~10:00',
  RANGE_10_12 = '10:00~12:00',
  RANGE_12_14 = '12:00~14:00',
  RANGE_14_16 = '14:00~16:00',
  RANGE_16_18 = '16:00~18:00',
}

export const CreateOrderFormSchema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
  zipcode: z.string().regex(new RegExp('^[0-9]{3}-[0-9]{4}$'), {
    message: '- を含む半角数字7桁で入力してください',
  }),
  prefecture: z.string().min(1, { message: '都道府県を入力してください' }),
  municipalities: z.string().min(1, { message: '市区町村を入力してください' }),
  address: z.string().min(1, { message: '住所を入力してください' }),
  telephone: z.string().min(1, { message: '電話番号を入力してください' }),
  deliveryDate: z.string().min(1, { message: '配達日を入力してください' }),
  deliveryTime: z.nativeEnum(TimeRange, {
    message: '配達時間を選択してください',
  }),
  paymentMethod: z.string().default('cache'),
});

export type CreateOrderForm = z.infer<typeof CreateOrderFormSchema>;
export type CreateOrderFormError = z.inferFormattedError<
  typeof CreateOrderFormSchema
>;
