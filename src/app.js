const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const repositoriesLikes = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const id =  uuid();
  const likes = 0

  const repository = { id , title, url, techs, likes};
  repositories.push(repository)

  const newLike = {id, likes}
  repositoriesLikes.push(newLike)

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs} = request.body;
  
  const index = repositories.findIndex(item => item.id === id);

  if(index < 0 ) {
    return response.status(400).json({msg: 'Error'})
  }

  const repository = { id, title, url, techs, likes: repositories[index].likes};
  repositories[index] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex( item => {item.id === id})

      if(!isUuid(id)) {
        return response.status(400).json({msg: 'Not found'})
      } else {
        repositories.splice(repositories.indexOf(index), 1);
        return response.status(204).send();;

      }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const {likes} = request.body;

  const index = repositories.findIndex(item => item.id === id);
  if(index < 0) {
    return response.status(400).json({msg: 'Error'});
  } else {
    repositories[index].likes += 1;
    const updatedRepositoryLikes = repositories[index];
    return response.json(updatedRepositoryLikes)
  } 
});

module.exports = app;
