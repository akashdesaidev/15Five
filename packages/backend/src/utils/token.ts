import crypto from 'crypto';

export function generateInvitationToken(): string {
  return crypto.randomBytes(32).toString('hex');
} 