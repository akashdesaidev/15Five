const { config } = require('../config');

const sendInvitationEmail = async (email, token, organizationName) => {
  // TODO: Implement email sending logic
  console.log(`Invitation email would be sent to ${email} with token ${token} for ${organizationName}`);
};

module.exports = { sendInvitationEmail }; 