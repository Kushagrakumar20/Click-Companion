const Message = require("../models/message.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cryptojs = require("crypto-js");

// Create a Message
exports.createMessage = catchAsync(async (req, res, next) => {
  const { message, ...rest } = req.body;

  // Encrypt message with a proper encryption key (not JWT secret ideally)
  const encryptedMessage = cryptojs.AES.encrypt(
    message,
    process.env.MESSAGE_SECRET || process.env.JWT_SECRET
  ).toString();

  const newMessage = new Message({
    ...rest,
    message: encryptedMessage,
  });

  await newMessage.save(); // Allow validation

  res.status(200).json({ status: "success", message: "Message sent!" });
});

// Get Messages
exports.getMessages = catchAsync(async (req, res, next) => {
  const messagesFromDB = await Message.find({
    conversationId: req.params.conversationId, // Use proper param name
  });

  const decryptedMessages = messagesFromDB.map((msg) => {
    const decrypted = cryptojs.AES.decrypt(
      msg.message,
      process.env.MESSAGE_SECRET || process.env.JWT_SECRET
    ).toString(cryptojs.enc.Utf8);

    return {
      ...msg.toObject(),
      message: decrypted,
    };
  });

  res.status(200).json({
    status: "success",
    results: decryptedMessages.length,
    data: decryptedMessages,
  });
});
