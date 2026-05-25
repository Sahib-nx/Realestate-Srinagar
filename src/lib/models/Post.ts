import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'Achievement' | 'Company Update' | 'Market Insight' | 'Advice'
  coverImage: string
  author: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['Achievement', 'Company Update', 'Market Insight', 'Advice'],
      default: 'Company Update',
    },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'Realestate Srinagar' },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Auto-generate slug from title if not provided
PostSchema.pre('save', function (this: IPost) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
})

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)

export default Post