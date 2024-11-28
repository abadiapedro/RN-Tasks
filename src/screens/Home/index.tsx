import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

const Home = () => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Adicionar uma nova tarefa
  const handleTaskAdd = () => {
    const newTask: Task = {
      id: Math.random(),
      name: taskName,
      isCompleted: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskName("");
  };

  // Remover uma tarefa
  const handleTaskRemove = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Alternar estado de conclusão
  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor="#808080"
          onChangeText={setTaskName}
          value={taskName}
        />
        <TouchableOpacity
          style={[styles.addButton, !taskName.trim() && styles.disabledButton]}
          onPress={handleTaskAdd}
          disabled={!taskName.trim()}
        >
          <Text style={{ color: "#F2F2F2", fontSize: 25, fontWeight: "bold" }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Contadores de tarefas */}
      <View style={styles.taskCounters}>
        <Text style={styles.counterText}>
          Criadas <Text style={styles.counterNumber}>{tasks.length}</Text>
        </Text>
        <Text style={styles.counterText}>
          Concluídas{" "}
          <Text style={styles.counterNumber}>
            {tasks.filter((task) => task.isCompleted).length}
          </Text>
        </Text>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onRemove={handleTaskRemove}
            onToggleCompletion={toggleTaskCompletion}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Você ainda não tem tarefas cadastradas.
          </Text>
        )}
      />
    </View>
  );
};

const TaskItem = ({
  task,
  onRemove,
  onToggleCompletion,
}: {
  task: Task;
  onRemove: (id: number) => void;
  onToggleCompletion: (id: number) => void;
}) => (
  <View style={styles.taskItem}>
    <Checkbox
      status={task.isCompleted ? "checked" : "unchecked"}
      onPress={() => onToggleCompletion(task.id)}
      color="#5E60CE"
    />
    <Text style={[styles.taskText, task.isCompleted && styles.completedTask]}>
      {task.name}
    </Text>
    <TouchableOpacity onPress={() => onRemove(task.id)}>
      <FontAwesome name="trash" size={20} color="#E25858" />
    </TouchableOpacity>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4EA8DE",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#262626",
    color: "#F2F2F2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#0D0D0D",
  },
  addButton: {
    backgroundColor: "#4EA8DE",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  disabledButton: {
    backgroundColor: "#1C2733",
  },
  taskCounters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: "#808080",
  },
  counterNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4EA8DE",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#F2F2F2",
    marginLeft: 8,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#808080",
  },
  emptyListText: {
    color: "#808080",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
