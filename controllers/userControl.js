// const User = require('../models/userSchema');
// const ConfirmationToken = require('../models/ConfirmationToken');
// const ObjectId = require('mongoose').Types.ObjectId;

// const {
//   validateEmail,
//   validateFullName,
//   validateUsername,
// } = require('../utils/validation');

// module.exports.retrieveUser = async (req, res, next) => {
//   const { username } = req.params;
//   const requestingUser = res.locals.user;
//   try {
//     const user = await User.findOne(
//       { username },
//       'username fullName avatar bio bookmarks fullName _id website'
//     );
//     if (!user) {
//       return res
//         .status(404)
//         .send({ error: 'Could not find a user with that username.' });
//     }

//     const posts = await Post.aggregate([
//       {
//         $facet: {
//           data: [
//             { $match: { author: ObjectId(user._id) } },
//             { $sort: { date: -1 } },
//             { $limit: 12 },
//             {
//               $lookup: {
//                 from: 'postvotes',
//                 localField: '_id',
//                 foreignField: 'post',
//                 as: 'postvotes',
//               },
//             },
//             {
//               $lookup: {
//                 from: 'comments',
//                 localField: '_id',
//                 foreignField: 'post',
//                 as: 'comments',
//               },
//             },
//             {
//               $lookup: {
//                 from: 'commentreplies',
//                 localField: 'comments._id',
//                 foreignField: 'parentComment',
//                 as: 'commentReplies',
//               },
//             },
//             {
//               $unwind: '$postvotes',
//             },
//             {
//               $addFields: { image: '$thumbnail' },
//             },
//             {
//               $project: {
//                 user: true,
//                 followers: true,
//                 following: true,
//                 comments: {
//                   $sum: [{ $size: '$comments' }, { $size: '$commentReplies' }],
//                 },
//                 image: true,
//                 thumbnail: true,
//                 filter: true,
//                 caption: true,
//                 author: true,
//                 postVotes: { $size: '$postvotes.votes' },
//               },
//             },
//           ],
//           postCount: [
//             { $match: { author: ObjectId(user._id) } },
//             { $count: 'postCount' },
//           ],
//         },
//       },
//       { $unwind: '$postCount' },
//       {
//         $project: {
//           data: true,
//           postCount: '$postCount.postCount',
//         },
//       },
//     ]);

//     const followersDocument = await Followers.findOne({
//       user: ObjectId(user._id),
//     });

//     const followingDocument = await Following.findOne({
//       user: ObjectId(user._id),
//     });

//     return res.send({
//       user,
//       followers: followersDocument.followers.length,
//       following: followingDocument.following.length,
//       // Check if the requesting user follows the retrieved user
//       isFollowing: requestingUser
//         ? !!followersDocument.followers.find(
//             (follower) => String(follower.user) === String(requestingUser._id)
//           )
//         : false,
//       posts: posts[0],
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.confirmUser = async (req, res, next) => {
//   const { token } = req.body;
//   const user = res.locals.user;

//   try {
//     const confirmationToken = await ConfirmationToken.findOne({
//       token,
//       user: user._id,
//     });
//     if (!confirmationToken) {
//       return res
//         .status(404)
//         .send({ error: 'Invalid or expired confirmation link.' });
//     }
//     await ConfirmationToken.deleteOne({ token, user: user._id });
//     await User.updateOne({ _id: user._id }, { confirmed: true });
//     return res.send();
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.updateProfile = async (req, res, next) => {
//     const user = res.locals.user;
//     const { fullName, username, email } = req.body;
//     let confirmationToken = undefined;
//     let updatedFields = {};
//     try {
//       const userDocument = await User.findOne({ _id: user._id });
  
//       if (fullName) {
//         const fullNameError = validateFullName(fullName);
//         if (fullNameError) return res.status(400).send({ error: fullNameError });
//         userDocument.fullName = fullName;
//         updatedFields.fullName = fullName;
//       }
  
//       if (username) {
//         const usernameError = validateUsername(username);
//         if (usernameError) return res.status(400).send({ error: usernameError });
//         // Make sure the username to update to is not the current one
//         if (username !== user.username) {
//           const existingUser = await User.findOne({ username });
//           if (existingUser)
//             return res
//               .status(400)
//               .send({ error: 'Please choose another username.' });
//           userDocument.username = username;
//           updatedFields.username = username;
//         }
//       }
  
//       if (email) {
//         const emailError = validateEmail(email);
//         if (emailError) return res.status(400).send({ error: emailError });
//         // Make sure the email to update to is not the current one
//         if (email !== user.email) {
//           const existingUser = await User.findOne({ email });
//           if (existingUser)
//             return res
//               .status(400)
//               .send({ error: 'Please choose another email.' });
//           confirmationToken = new ConfirmationToken({
//             user: user._id,
//             token: crypto.randomBytes(20).toString('hex'),
//           });
//           await confirmationToken.save();
//           userDocument.email = email;
//           userDocument.confirmed = false;
//           updatedFields = { ...updatedFields, email };
//         }
//       }
//       const updatedUser = await userDocument.save();
//       res.send(updatedFields);
//       // if (email && email !== user.email) {
//       //   sendConfirmationEmail(
//       //     updatedUser.username,
//       //     updatedUser.email,
//       //     confirmationToken.token
//       //   );
//       // }
//     } catch (err) {
//       next(err);
//     }
//   };