const mongoose = require('mongoose');

const communityMembershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('CommunityMembership', communityMembershipSchema);
