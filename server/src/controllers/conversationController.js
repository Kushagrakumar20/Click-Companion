const Conversations = require("../models/conversation.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new conversation
exports.newConversation = catchAsync(async (req, res, next) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return next(new AppError("SenderId and ReceiverId are required", 400));
  }

  // Check if conversation already exists
  const existingConversation = await Conversations.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (existingConversation) {
    return res.status(200).json({
      status: "success",
      message: "Chat already exists",
      conversation: existingConversation,
    });
  }

  // Create and save new conversation
  const newConversation = await Conversations.create({
    members: [senderId, receiverId],
  });

  res.status(201).json({
    status: "success",
    message: "Conversation created successfully",
    conversation: newConversation,
  });
});

// Get all conversations of a user
exports.getConversation = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError("UserId is required", 400));
  }

  const conversations = await Conversations.find({
    members: { $in: [userId] },
  }).populate("members", "name photosLink");

  res.status(200).json({
    status: "success",
    count: conversations.length,
    conversations,
  });
});

// Get conversation users' details
exports.getConvoUsers = catchAsync(async (req, res, next) => {
  const userList = req.body.data?.filter((id) => id) || [];

  if (!userList.length) {
    return next(new AppError("No valid user IDs provided", 400));
  }

  const users = await User.find({ _id: { $in: userList } }).select(
    "_id name photosLink"
  );

  const detailedUserList = users.map((user) => ({
    userId: user._id,
    name: user.name,
    profilePicture: user.photosLink?.[0] || null,
  }));

  res.status(200).json({
    status: "success",
    users: detailedUserList,
  });
});
