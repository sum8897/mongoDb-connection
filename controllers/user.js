import { User } from "../models/User.js";

export const userRegister = async (req, resp) => {
  console.log(req.body);
  try {
    let user = await User.create(req.body);
    resp.json({
      message: "Your form have been submitted successfully...",
      newUser: user,
      success: true,
      error: false,
    });
  } catch (error) {
    req.json({
      message: error.message,
      status: false,
      error: true,
    });
  }
};
