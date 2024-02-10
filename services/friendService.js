// services/friendService.js
const db = require('../database');
const redisClient=require('../utils/redis');
const getFriendRequests = async (userId) => {
  const keyName = 'friendfriends';
  const cached = await redisClient.get(keyName);

  if (cached) {
    return JSON.parse(cached);
  } else {
    try {
      const friendRequests = await db.query('SELECT * FROM friendships WHERE user2_id = ?', [userId]);

      redisClient.set(keyName, JSON.stringify(friendRequests[0]), { EX: 30 });
      return friendRequests[0];
    } catch (error) {
      console.log(error);
      throw new Error('internal server error');
    }
  }
};

const acceptFriendRequest = async (userId, friendId) => {
  try {
    const currentUser = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    const friendUser = await db.query('SELECT * FROM users WHERE user_id = ?', [friendId]);

    const updatedFriendList = [...currentUser[0][0].friend_list, friendId];
    const updatedFriendListFriend = [...friendUser[0][0].friend_list, userId];

    await db.query('UPDATE users SET friend_list = ? WHERE user_id = ?', [
      JSON.stringify(updatedFriendList),
      userId,
    ]);
    await db.query('UPDATE users SET friend_list = ? WHERE user_id = ?', [
      JSON.stringify(updatedFriendListFriend),
      friendId,
    ]);

    await db.query('DELETE FROM friendships WHERE user1_id = ? AND user2_id = ?', [
      friendId,
      userId,
    ]);

    return { message: 'friend accept' };
  } catch (error) {
    console.log(error);
    throw new Error('internal server error');
  }
};

const getAllFriends = async (userId) => {
  const keyName = 'allfriends';
  const cached = await redisClient.get(keyName);

  if (cached) {
    return JSON.parse(cached);
  } else {
    try {
      const friends = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);

      redisClient.set(keyName, JSON.stringify(friends[0][0]), { EX: 30 });
      return friends[0][0];
    } catch (error) {
      console.log(error);
      throw new Error('internal server error');
    }
  }
};

const sendFriendRequest = async (userId, friendId) => {
  try {
    const checkUser = await db.query('SELECT * FROM users WHERE user_id = ?', [friendId]);

    if (checkUser[0].length === 0) {
      return { message: 'no user found' };
    }

    const userList = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    const friendList = userList[0][0].friend_list;

    for (let j = 0; j < friendList.length; j++) {
      if (friendId == parseInt(friendList[j])) {
        return { message: 'user already in friend list' };
      }
    }

    await db.query('INSERT INTO friendships (user1_id, user2_id) VALUES (?, ?)', [
      userId,
      friendId,
    ]);

    return { message: 'friend request sent successfully' };
  } catch (error) {
    console.log(error);
    throw new Error('internal server error');
  }
};
const friendUpdate=async (friendlist,user_id)=>{
  return db.query('update users set friend_list=? where user_id=?', [
    friendlist,
    user_id,
  ]);
}

module.exports = {
  getFriendRequests,
  acceptFriendRequest,
  getAllFriends,
  sendFriendRequest,
  friendUpdate
};
