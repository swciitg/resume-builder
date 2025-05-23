const User = require("../schema/userSchema");

module.exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user.oid;
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.saveProgress = async (req, res) => {
      if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }
    try {
        const updatedData = req.body.resumeData;
        const userId = req.user.userId;
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, {$set : updatedData}, { new: true });
        res.status(200).json({ message: "User info updated successfully", user: updatedUser }); 
        }
    catch (error) {
        console.error("Error updating user info:", error);
        res.status(500).json({ message: "Internal server error" });
        }
}
