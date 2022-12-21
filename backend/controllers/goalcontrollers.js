const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalsModel");
const User = require("../models/usersModel");

//@desc get Goals
//@route Get /api/goals
//@acces private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }).select('-userType');
  res.status(200).json(goals);
});



//@desc get all Goals as admin only
//@route Get /api/allgoals
//@acces private 
const getAllGoals = asyncHandler(async (req, res) => {
  console.log(req.user)
  const goals = await Goal.find().select('-userType');
  res.status(200).json(goals);
})



//@desc set Goal
//@route set /api/goals
//@acces private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
    userType: req.user.userType
  });
  res.status(201).json(goal);
});

//@desc set Goals as admin
//@route set /api/goals/:id (id of user to whom you want to assign goal)
//@acces private
const setGoalsAsadmin = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }

  const user = await User.findById(req.params.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found to whom you are trying to assign goal");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.params.id,
    userType: req.user.id === req.params.id ? req.user.userType : "user"
  });
  res.status(201).json(goal);
});




//@desc update Goal
//@route update /api/goals/:id
//@acces private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure loged in user matches the goal user
  console.log(user)
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});


//@desc update Goal as admin only
//@route update /api/goals/:id
//@acces private
const updateGoalsAsadmin = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});



//@desc Delete Goal
//@route Delete /api/goals/:id
//@acces private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure loged in user matches the goal user
  console.log(user)
  if (goal.user.toString() !== user.id && user.userType !== "admin") {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

//@desc Delete Goal as admin only
//@route Delete /api/goals/:id
//@acces private
const deleteGoalsAsadmin = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});



module.exports = {
  setGoals,
  getGoals,
  updateGoals,
  deleteGoals,
  getAllGoals,
  updateGoalsAsadmin,
  deleteGoalsAsadmin,
  setGoalsAsadmin

};
