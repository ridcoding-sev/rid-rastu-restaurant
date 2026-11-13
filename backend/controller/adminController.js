import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let role = "";

    // Admin
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      role = "admin";
    }

    // Moderator 1
    else if (
      email === process.env.MODERATOR1_EMAIL &&
      password === process.env.MODERATOR1_PASSWORD
    ) {
      role = "moderator";
    }

    // Moderator 2
    else if (
      email === process.env.MODERATOR2_EMAIL &&
      password === process.env.MODERATOR2_PASSWORD
    ) {
      role = "moderator";
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        email,
        role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      role,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
