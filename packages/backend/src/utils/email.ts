import { config } from '../config';

export async function sendInvitationEmail(email: string, token: string): Promise<void> {
  // TODO: Implement actual email sending
  console.log(`Sending invitation email to ${email} with token ${token}`);
  
  // For development, just log the invitation link
  const invitationLink = `${config.frontendUrl}/invitation?token=${token}`;
  console.log(`Invitation link: ${invitationLink}`);
} 