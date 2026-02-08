import { z } from 'zod'

const CreateMemberSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  phone: z.string().optional(),
  birthDate: z.date().optional(),
  parentId: z.string().optional(),
  photo: z.string().optional(),
})

const UpdateMemberSchema = CreateMemberSchema.partial();

const MemberSchema = CreateMemberSchema.extend({
  id: z.string(),
  cretaed_at: z.date()
})


type Member = z.infer<typeof MemberSchema>;
type CreateMember = z.infer<typeof CreateMemberSchema>;
type UpdateMember = z.infer<typeof UpdateMemberSchema>;

export {
  Member,
  MemberSchema,
  CreateMemberSchema,
  CreateMember,
  UpdateMemberSchema,
  UpdateMember
}
