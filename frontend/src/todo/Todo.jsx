import React, { Component, useState } from "react";
import PageHeader from "../template/PageHeader";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";

const URL = "http://localhost:3003/api/todos";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.refresh();
  }
  refresh(description = "") {
    const search = description ? `&description__regex=/${description}/` : ''
    axios
      .get(`${URL}?sort=-createdAt${search}`)
      .then((resp) =>
        this.setState({ ...this.state, description, list: resp.data })
      );
  }
  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description }).then((resp) => this.refresh());
  }
  handleSearch() {
    this.refresh(this.state.description);
  }
  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value });
  }
  handleRemove(todo) {
    axios.delete(`${URL}/${todo._id}`).then((resp) => this.refresh(this.state.description));
  }
  handleMarkAsDone(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then((resp) => this.refresh(this.state.description));
  }
  handleMarkAsPending(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then((resp) => this.refresh(this.state.description));
  }
  handleClear(){
    this.refresh()
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm
          handleChange={this.handleChange}
          description={this.state.description}
          handleAdd={this.handleAdd}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}
        />
        <TodoList
          list={this.state.list}
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}
        />
      </div>
    );
  }
}
