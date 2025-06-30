const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersCollection } = require('../Database Collection/collection');

// POST /api/users
const postUser = async (req, res) => {
  const { name, email, password, about, photoURL } = req.body;
  console.log("body", req.body)
  try {
    const salt = parseInt(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new usersCollection({
      name,
      email,
      password: hashedPassword,
      about,
      photoURL,
    });
    console.log(user)
    const createdUser = await user.save();

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create user!',
      status: false,
    });
  }
};

// POST /api/login
const loginUser = async (req, res) => {
  // console.log('from verity')
  try {
    const { email, password } = req.body;

    const user = await usersCollection.findOne({ email });
    // console.log('from verity',user)
    if (!user) {
      return res.status(404).json({
        message: "This user is not available in the database.",
        status: 404,
      });
    }

    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      return res.status(401).json({
        message: "Wrong password",
        status: 401,
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    );
    // console.log("Generated JWT token:", token); 
    const { password: pwd, ...userWithoutPassword } = user.toObject ? user.toObject() : user;

    res
      .cookie("login_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        status: 200,
        token,
        user: userWithoutPassword,
      });

  } catch (error) {
    res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
      status: 500,
    });
  }
};


module.exports = { postUser, loginUser };
