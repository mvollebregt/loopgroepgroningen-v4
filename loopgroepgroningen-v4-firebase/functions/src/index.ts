import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {GrantPermission} from './api/grant-permission';
import {requireCondition, userLoggedIn} from './auth';
import UserRecord = admin.auth.UserRecord;
import ListUsersResult = admin.auth.ListUsersResult;

admin.initializeApp();

export const grantPermission = functions.https.onCall(
  // TODO: juist rechten zetten
  requireCondition(userLoggedIn, async (data: GrantPermission) => {
    await admin.auth().setCustomUserClaims(data.uid, data.permission);
    await admin.auth().revokeRefreshTokens(data.uid); // TODO: is dit nodig?!?
  })
);


export const listUsers = functions.https.onCall(
  // TODO: juist rechten zetten
  requireCondition(userLoggedIn, async () => {
    const userRecords: Partial<UserRecord>[] = [];
    let nextPageToken = undefined;
    do {
      const listUsersResult: ListUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      // TODO: check welke data voor deze gebruiker teruggegeven mag worden
      userRecords.push(...listUsersResult.users.map(user => {
        const {uid, displayName, customClaims} = user;
        return {uid, displayName, customClaims};
      }));
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    return userRecords;
  })
);
