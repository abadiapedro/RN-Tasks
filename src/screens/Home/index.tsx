import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

interface Task {
    id: number;
    name: string;
}

const Home = () => {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const TaskItem = ({ task, onRemove }: { task: Task; onRemove: (id: number) => void }) => (
        <View style={styles.taskItem}>
            <Text>{task.name}</Text>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(task.id)}
            >
                <FontAwesome name="trash-o" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );


    function handleTaskAdd() {
        console.log('Adicionar tarefa');
        const newTask: Task = {
            id: Math.random(),
            name: taskName
        }
        setTasks(oldState => [...oldState, newTask]);
        setTaskName('');
    }

    function handleTaskRemove(taskId: number) {
        Alert.alert(
            'Remover Tarefa',
            'Tem certeza que deseja remover esta tarefa?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    onPress: () =>
                        setTasks(oldState => oldState.filter(task => task.id !== taskId)),
                    style: 'destructive'
                }
            ]
        );
    }

    return (
        <View style={styles.container} >
            <Text style={styles.taskName}>
                Adicionar Tarefa
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome da tarefa..."
                    placeholderTextColor="#aaa"
                    onChangeText={setTaskName}
                    value={taskName}
                />
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: taskName.trim() ? '#333' : '#ccc' }
                    ]}
                    onPress={handleTaskAdd}
                    disabled={!taskName.trim()}
                >
                    <Text style={styles.buttonText}>
                        Adicionar
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={tasks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <TaskItem task={item} onRemove={handleTaskRemove} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 40
    },
    taskName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    form: {
        flexDirection: 'row',
        marginTop: 10
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    button: {
        height: 40,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    },
    list: {
        marginTop: 20
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    removeButton: {
        padding: 5, 
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home;

