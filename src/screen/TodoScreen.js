import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { IconButton } from "react-native-paper";
import ImageComponent from "./../components/ImageComponent";

const TodoScreen = () => {
  const [todo, setTodo] = useState(""); // State for the input value
  const [todoList, setTodoList] = useState([]); // State for the list of todos
  const [editingTodo, setEditingTodo] = useState(null); // State to track editing mode

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (todo.trim()) {
      const newTodo = { id: Date.now().toString(), title: todo.trim() };
      setTodoList((prevTodos) => [...prevTodos, newTodo]);
      setTodo("");
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Function to handle editing a todo
  const handleEditTodo = (item) => {
    setEditingTodo(item);
    setTodo(item.title);
  };

  // Function to handle updating a todo
  const handleUpdateTodo = () => {
    setTodoList((prevTodos) =>
      prevTodos.map((item) =>
        item.id === editingTodo.id ? { ...item, title: todo } : item
      )
    );
    setEditingTodo(null);
    setTodo("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a Task"
        value={todo}
        onChangeText={setTodo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={editingTodo ? handleUpdateTodo : handleAddTodo}
      >
        <Text style={styles.buttonText}>{editingTodo ? "Save" : "Add"}</Text>
      </TouchableOpacity>
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {todoList.length === 0 && <ImageComponent />}
    </View>
  );
};

// Functional component to render each todo item
const TodoItem = ({ item, onEdit, onDelete }) => (
  <View style={styles.todoItem}>
    <Text style={styles.todoText}>{item.title}</Text>
    <IconButton
      icon="trash-can"
      color="#fff"
      onPress={() => onDelete(item.id)}
    />
    <IconButton icon="pencil" color="#fff" onPress={() => onEdit(item)} />
  </View>
);

// Styles for the components
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  todoItem: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
  },
});

export default TodoScreen;
