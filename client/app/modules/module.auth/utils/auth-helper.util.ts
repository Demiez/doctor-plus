import { ModuleAuth_AuthController } from '../controllers/auth.controller';

class AuthHelper {
  public authenticateJWT(jwtData: {}, callback: Function): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwtData));
    }

    callback();
  }

  public checkAuthentication(): boolean | any {
    if (typeof window !== 'undefined') {
      return false;
    }

    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt'));
    } else {
      return false;
    }
  }

  public clearJWT(callback: Function): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt');
    }

    callback();

    ModuleAuth_AuthController.signOut().then((data) => {
      document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
  }
}

export const ModuleAuth_AuthHelper: AuthHelper = new AuthHelper();
