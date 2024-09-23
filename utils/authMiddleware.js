export const checkAuth = (authorisedRole) => {
  return async (req, res, next) => {
    try {
      const { role } = req.user;
      if (!role) {
        return res.status(401).json({ message: "Unauthorized: Role not found" });
      }
      if (role === "admin") {
        next();
      } else if (role === authorisedRole) {
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized: You are not authorized" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
