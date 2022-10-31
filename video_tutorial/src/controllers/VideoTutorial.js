let todos = [
    {
        title: "Hello Express",
    }
]

// Create controller get Todos here
exports.getTodos = async (req, res) => {
    try {
        res.send({
            status: "success",
            data: {
            todos,
            },
        });
        } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
        }
    };

// Create controller add Todo here
exports.addTodo = async (req, res) => {
    try {
      todos = [...todos, req.body];
      res.send({
        status: "success",
        data: {
          todos,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };