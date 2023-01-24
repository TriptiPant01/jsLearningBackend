import Todo from "../model/Todo.js";

export const getTodoController = async (request, response) => {
  // console.log(request.user, request.user.userDetail.email);
  try {
    // console.log(request.body);
    const list = await Todo.find({ email: "ball@gamail.com" });

    return response.status(200).json(list);
  } catch (err) {
    return response.status(500).json(err.message);
  }
};

export const postTodoController = async (request, response) => {
  try {
    const newTodo = await Todo.create({
      value: request.body.value,
      createdAt: Date.now(),
    });
    console.log(newTodo, "how is this possible");
    await newTodo.save();
    return response.status(200).json(newTodo);
  } catch (err) {
    return response.status(500).json(err.message);
  }
};

export const getTodoById = async (request, response) => {
  // console.log(request.params.id);
  const id = request.params.id;
  try {
    const todoById = await Todo.findById(id);
    // const todoByFind = await Todo.find({ _id: id }); // return type is array
    return response.status(200).json(todoById);
  } catch (err) {
    console.log(err);
  }
};

export const getTodoByIdAndUpdate = async (request, response) => {
  const id = request.params.id;

  const { value, done = false } = request.body;
  try {
    const todoUpdateById = await Todo.findByIdAndUpdate(id, {
      value,
      done,
    });
    console.log(todoUpdateById, "this is to update");
    await todoUpdateById.save();
    return response.status(200).json({
      statusCode: 200,
      message: "successfully Updated",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTodoByIdAndDelete = async (request, response) => {
  const id = request.params.id;
  try {
    await Todo.findByIdAndDelete(id);
    return response.status(200).json({
      message: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTodos = async (request, response) => {
  try {
    await Todo.deleteMany();
    return response.status(200).json({
      message: "All todos are deleted",
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateAllTodos = async (request, response) => {
  console.log(request);
  try {
    const todoUpdateById = await Todo.updateMany(
      { done: false },
      {
        $set: { done: true },
        $currentDate: { lastModified: true },
      }
    );
    return response.status(200).json({ message: "successfully updated" });
    // await todoUpdateById.save();
  } catch (err) {
    console.log(err);
  }
};
