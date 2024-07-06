import timezone from 'moment-timezone';


const defaultSchema = {
  aTitle: { type: String, trim: true },
  aSubtitle: { type: String, trim: true },
  aDescription: { type: String, trim: true },
  aDetail: { type: String, trim: true },
  aStatus: { type: Boolean, default: false },
  aSlug: { type: String, trim: true },

  bCreatedAt: { type: Date, default: timezone(Date.now()).tz('Asia/Kolkata') },
  bUpdatedAt: { type: Date }
}

export default defaultSchema;
