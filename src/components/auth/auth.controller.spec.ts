import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    // Create an instance of AuthService and AuthController
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    it('should call authService.signup and return the result', async () => {
      // Create a mock SignUpDto and the expected result
      const signUpDto = { name: 'test', email: 'test@test.com', password: 'test123' };
      const expectedResult = {
        access_token: 'tokenString',
      };

      // Mock the implementation of authService.signup
      jest.spyOn(authService, 'signup').mockImplementation(async () => expectedResult);

      // Call the signup method of authController and compare the result
      const result = await authController.signup(signUpDto);
      expect(result).toEqual(expectedResult);

      // Verify that authService.signup was called with the correct arguments
      expect(authService.signup).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signin', () => {
    it('should call authService.signin and return the result', async () => {
      // Create a mock SignInDto and the expected result
      const signInDto = { email: 'test@test.com', password: 'test123' };
      const expectedResult = { access_token: 'tokenstring' };

      // Mock the implementation of authService.signin
      jest.spyOn(authService, 'signin').mockImplementation(async () => expectedResult);

      // Call the signin method of authController and compare the result
      const result = await authController.signin(signInDto);
      expect(result).toEqual(expectedResult);

      // Verify that authService.signin was called with the correct arguments
      expect(authService.signin).toHaveBeenCalledWith(signInDto);
    });
  });
});
