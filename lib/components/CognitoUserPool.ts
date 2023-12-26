import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';

import { Constants } from '../utils/Constants';

export default class CognitoUserPool {

    private emailVerificationMessage = '<h1> Verification Code </h1> Your verification code is {####}.'
    private emailVerificationSubject = 'RentCraft SignUp verification code'
  
    public userPool: cdk.aws_cognito.UserPool;
  
    constructor(scope: Construct, id: string) {
      this.userPool = this.createUserPool(scope, id)
    }
  
    private createUserPool(scope: Construct, id: string): cdk.aws_cognito.UserPool {
      return new cognito.UserPool(scope, id, {
        userPoolName: 'rentcraft',
        signInAliases: {
          email: true,
          username: true,
        },
        mfa: cognito.Mfa.OFF,
        email: cognito.UserPoolEmail.withSES({
          fromEmail: Constants.businessEmail,
          fromName: 'RentCraft',
          sesRegion: Constants.awsRegionName
        }),
        userVerification: {
            emailSubject: this.emailVerificationSubject,
            emailBody: this.emailVerificationMessage
        },
      });
    }
}