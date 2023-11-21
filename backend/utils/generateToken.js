import jwt from "jsonwebtoken";

const generateToken = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  res.cookie(role, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  });
};

export default generateToken;
