import * as functions from 'firebase-functions';

type Condition = (data: any, context: functions.https.CallableContext) => boolean;
type CallableFunction = (data: any, context: functions.https.CallableContext) => Promise<any>;

export function allOf(...conditions: Condition[]): Condition {
  return (data, context) => conditions.every(condition => condition(data, context));
}

export function userLoggedIn(data: any, context: functions.https.CallableContext): boolean {
  return !!context.auth;
}

export function requireCondition(condition: Condition, fn: CallableFunction): CallableFunction {
  return async (data: any, context: functions.https.CallableContext) => {
    if (!condition(data, context)) {
      throw new functions.https.HttpsError('permission-denied', 'Permission denied')
    } else {
      return await fn(data, context);
    }
  };
}
