import { Server } from "miragejs";
import charities from "./data/charities";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    seeds(server) {
      server.db.loadData({
        charities,
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/charities", ({ db }) => {
        return db.charities;
      });

      //   this.patch("/todos/:id", (schema, request) => {
      //     let todo = JSON.parse(request.requestBody).data;

      //     return schema.db.todos.update(todo.id, todo);
      //   });

      //   this.post("/todos", (schema, request) => {
      //     let todo = JSON.parse(request.requestBody).data;

      //     return schema.db.todos.insert(todo);
      //   });

      //   this.delete("/todos/:id", (schema, request) => {
      //     return schema.db.todos.remove(request.params.id);
      //   });
    },
  });

  window.server = server;

  return server;
}
