import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import CognitoUserPool from './components/CognitoUserPool';

export class RentcraftCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new CognitoUserPool(this, 'rentcraft');
  }
}
