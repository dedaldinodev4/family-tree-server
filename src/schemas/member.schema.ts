import { z } from 'zod'

const CreateMemberSchema = z.object({
  name: z.string({ error: "Minimal error"}).min(4),
  phone: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  birthDate: z.date().optional().nullable(),
  parentId: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
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
