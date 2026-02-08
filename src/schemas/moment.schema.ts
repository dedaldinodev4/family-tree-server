import { z } from 'zod'

const CreateMomentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.date(),
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
