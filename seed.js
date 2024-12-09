const mongoose = require("mongoose");
const User = require("./Models/user"); // Ensure this points to the file where your `User` model is defined

mongoose.connect("mongodb://localhost:27017/myWeather", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  try {
    // Delete existing users to avoid duplicates
    await User.deleteMany();

    // Create 5 users
    const users = [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password: "password123",
      },
      {
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
        password: "password123",
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie@example.com",
        password: "password123",
      },
      {
        firstName: "Diana",
        lastName: "Prince",
        email: "diana@example.com",
        password: "password123",
      },
      {
        firstName: "Eve",
        lastName: "Adams",
        email: "eve@example.com",
        password: "password123",
      },
    ];

    await User.insertMany(users);

    console.log("Users seeded successfully!");
    process.exit(); // Exit the script
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1); // Exit with failure
  }
};

seedUsers();
