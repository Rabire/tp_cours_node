const fs = require("fs");
const JsonFilePath = "./TP2/users.json";
const rawdata = fs.readFileSync(JsonFilePath);
const storedUsers = JSON.parse(rawdata);

const getUserById = (userId) =>
  storedUsers.filter((user) => user.id === userId)[0];

exports.getAll = async (req, res) => {
  return res.send(storedUsers);
};

exports.getOne = async (req, res) => {
  const requestedUserId = parseInt(req.params.id);
  const requestedUser = getUserById(requestedUserId);

  return res.send(requestedUser);
};

exports.create = async (req, res) => {
  const userToCreate = req.body;
  const userList = storedUsers;

  storedUsers.push(userToCreate);

  fs.writeFile(JsonFilePath, JSON.stringify(userList), "utf-8", function (err) {
    if (err) throw err;
    console.log("filelistAsync complete");
  });

  return res.sendStatus(201);
};

exports.edit = async (req, res) => {
  const newData = req.body;
  const userToUpdateId = parseInt(req.params.id);

  const userToEdit = getUserById(userToUpdateId);

  for (const property in newData) {
    userToEdit[property] = newData[property];
  }

  const editedUser = userToEdit;

  const indexOfUserToUpdate = storedUsers.findIndex(
    (user) => user.id === userToUpdateId
  );

  storedUsers[indexOfUserToUpdate] = editedUser;

  const newUserList = storedUsers;

  fs.writeFile(JsonFilePath, JSON.stringify(newUserList), "utf-8", (err) => {
    if (err) throw err;
    console.log("filelistAsync complete");
  });

  return res.sendStatus(202);
};

exports.delete = async (req, res) => {
  const userToDeleteId = parseInt(req.params.id);

  const userToDelete = getUserById(userToDeleteId);

  const userList = storedUsers;

  const index = storedUsers.indexOf(userToDelete);
  if (index > -1) {
    storedUsers.splice(index, 1);
  }

  fs.writeFile(JsonFilePath, JSON.stringify(userList), "utf-8", (err) => {
    if (err) throw err;
    console.log("filelistAsync complete");
  });

  return res.sendStatus(202);
};
