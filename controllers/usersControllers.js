import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";
import RequestModel from "../models/requestModel.js";
import ContactModel from "../models/contactModel.js";

export async function signUp(req, res) {
  const userDetails = req.body;
  userDetails.password = await bcrypt.hash(userDetails.password, 10);
  const user = new UserModel(userDetails);
  await user.save();
  res.status(201).json({ message: "User created successfully" });
}

export async function logIn(req, res) {
  const loginDetails = req.body;
  const user = await UserModel.findOne({ email: loginDetails.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!(await bcrypt.compare(loginDetails.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user.name, user.email, user.role, user._id);
  res
    .status(200)
    .json({ user: user, token: token, message: "Login successful" });
}

export async function getAllUsers(req, res) {
  const users = await UserModel.find();
  res.status(200).json({ users: users });
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const user = await UserModel.findById(id).populate("bookingHistory");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user: user });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const newData = req.body;
  const user = await UserModel.findOneAndUpdate({ _id: id }, newData, {
    new: true,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user: user, message: "User updated successfully" });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
}

export async function getTheaterOwners(req, res) {
  const theaterOwners = await UserModel.find({ role: "theaterOwner" });
  if (!theaterOwners) {
    return res.status(404).json({ message: "Theater owners not found" });
  }
  res.status(200).json({ theaterOwners: theaterOwners, message: "Success" });
}

export async function verifyUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: id },
    { isVerified: !user.isVerified },
    { new: true }
  );
  res.status(200).json({
    user: updatedUser,
    message: `User ${updatedUser.isVerified ? "verified" : "unverified"}`,
  });
}

export async function requestVerification(req, res) {
  const { id } = req.user;
  const requestDetails = req.body;
  requestDetails.userID = id;
  const existingRequest = await RequestModel.findOne({ userID: id });
  if (existingRequest) {
    return res
      .status(400)
      .json({ message: "Verification request already sent" });
  }
  const request = new RequestModel(requestDetails);
  await request.save();
  res.status(201).json({ message: "Verification request sent successfully!" });
}

export async function getAllRequests(req, res) {
  const requests = await RequestModel.find().populate("userID");
  res.status(200).json({ requests: requests });
}

export async function deleteRequest(req, res) {
  const { id } = req.params;
  const request = await RequestModel.findByIdAndDelete(id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }
  res.status(200).json({ message: "Request deleted successfully" });
}

export async function contactUs(req, res) {
  const { name, email, message } = req.body;
  const contactUsDetails = {
    name,
    email,
    message,
  };
  const contactUs = new ContactModel(contactUsDetails);
  await contactUs.save();
  res.status(201).json({ message: "Message sent successfully" });
}

export async function getContactUs(req, res) {
  const contactUsRequests = await ContactModel.find();
  res.status(200).json({ contactUsRequests: contactUsRequests });
}

export async function deleteContactUs(req, res) {
  const { id } = req.params;
  const contactUs = await ContactModel.findByIdAndDelete(id);
  if (!contactUs) {
    return res.status(404).json({ message: "Contact Us request not found" });
  }
  res.status(200).json({ message: "Contact Us request deleted successfully" });
}

export async function changePasswordRequest(req, res) {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return res.status(200).json({ message: "Password changed successfully" });
}
