import { AuthService } from '../../services/authService';
import { UserRole } from '../../types/auth';
import { AppError } from '../../middleware/errorHandler';

describe('AuthService', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.EMPLOYEE,
      };

      const result = await AuthService.register(userData);

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(userData.email);
      expect(result.user.password).toBeUndefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.EMPLOYEE,
      };

      await AuthService.register(userData);

      await expect(AuthService.register(userData)).rejects.toThrow(
        new AppError(400, 'Email already registered')
      );
    });

    it('should throw error if passwords do not match', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.EMPLOYEE,
      };

      await expect(AuthService.register(userData)).rejects.toThrow(
        new AppError(400, 'Passwords do not match')
      );
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await AuthService.register({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.EMPLOYEE,
      });
    });

    it('should login successfully with correct credentials', async () => {
      const result = await AuthService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.password).toBeUndefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw error with incorrect password', async () => {
      await expect(
        AuthService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow(new AppError(401, 'Invalid credentials'));
    });

    it('should throw error with non-existent email', async () => {
      await expect(
        AuthService.login({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
      ).rejects.toThrow(new AppError(401, 'Invalid credentials'));
    });
  });

  describe('refreshToken', () => {
    let refreshToken: string;

    beforeEach(async () => {
      const result = await AuthService.register({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.EMPLOYEE,
      });
      refreshToken = result.refreshToken;
    });

    it('should refresh token successfully', async () => {
      const result = await AuthService.refreshToken(refreshToken);

      expect(result.user).toBeDefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.refreshToken).not.toBe(refreshToken);
    });

    it('should throw error with invalid token', async () => {
      await expect(
        AuthService.refreshToken('invalid-token')
      ).rejects.toThrow(new AppError(401, 'Invalid refresh token'));
    });
  });
}); 