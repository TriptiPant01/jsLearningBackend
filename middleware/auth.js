import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = Jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const TestMiddleware = async (req, res, next) => {
  console.log("this is testMiddleware");
  return true;
};

export default verifyToken;
