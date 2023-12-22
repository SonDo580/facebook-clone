/* Helper to process request body when updating user info .
   Remove the fields that have their own handlers.
*/
const processUpdatedUserInfo = async (requestBody: any = {}) => {
  delete requestBody.friends;
  delete requestBody.friendRequestsIn;
  delete requestBody.friendRequestsOut;
  delete requestBody.followers;
  delete requestBody.following;
  delete requestBody.following;
  delete requestBody.savedPosts;
  delete requestBody.details.familyMembers;
};

export { processUpdatedUserInfo };
