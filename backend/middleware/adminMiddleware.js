const adminMiddleware = (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access Denied . User is not an admin." });
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

export { adminMiddleware };
