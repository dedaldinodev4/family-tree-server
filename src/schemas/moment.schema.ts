import { z } from 'zod'

const CreateMomentSchema = z.object({
  title: z.string().min(1),
  date: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) return new Date(val);
  }, z.date()),
  images: z.string(),
})


const MomentSchema = CreateMomentSchema.extend({
  id: z.string(),
  cretaed_at: z.date()
})


type Moment = z.infer<typeof MomentSchema>;
type CreateMoment = z.infer<typeof CreateMomentSchema>;

export {
  Moment,
  MomentSchema,
  CreateMomentSchema,
  CreateMoment
}
