import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

@Injectable()
export class LoginService {
  constructor(private readonly config: ConfigService) {}

  private verify({
    cognitoUser,
    authenticationDetails,
  }: {
    cognitoUser: CognitoUser;
    authenticationDetails: AuthenticationDetails;
  }): Promise<{ accessToken: string }> {
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();

          return resolve({
            accessToken,
          });
        },

        onFailure: (err) => {
          return reject(err);
        },
      });
    });
  }

  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userPool = new CognitoUserPool({
      UserPoolId: this.config.get('AWS_COGNITO_USER_POOL_ID') || '',
      ClientId: this.config.get('AWS_COGNITO_CLIENT_ID') || '',
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    return this.verify({
      cognitoUser,
      authenticationDetails,
    });
  }
}
