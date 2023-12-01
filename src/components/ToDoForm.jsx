import React from 'react';
import { useState , useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';
import ApiData from '../components/ApiData';

function ToDoForm({ onAdd, existingTasks }) {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showApiData, setShowApiData] = useState(false);
  
  useEffect(() => {
    // Function to fetch tasks from 'tasks.json'
    const fetchTasks = async () => {
      try {
        const data = require('../data/tasks.json');
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

  // Call the fetchTasks function when the component mounts
  fetchTasks();
}, []);

 // randomly select a task from the fetched tasks when the user clicks the "Generate Random Task" button.
 const handleAddRandomTask = () => {
  const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  handleAddPressed(randomTask);
  setTaskText(randomTask);
}

 
  const handleAddPressed = () => {
    // Convert new task and existing tasks to lowercase for case-insensitive comparison
    const lowerCaseTaskText = taskText.toLowerCase();

    if (existingTasks.map(task => task.toLowerCase()).includes(lowerCaseTaskText)) {
      Alert.alert('Duplicate Task', 'This task already exists. Please enter a different task.');
      
      return;
    }

    // Add the task
    onAdd(taskText);

     // Clear the input after adding the task
     setTaskText('');
  }
  const handleToggleApiData = () => {
    setShowApiData(!showApiData);
  };

    return (
    <>
   
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          onChangeText={(text) => setTaskText(text)}
          value={taskText}
        />
        <Button title="Add" onPress={handleAddPressed}/>
        <Button title="Generate Random Task" onPress={handleAddRandomTask}/>
        <Button
          title={showApiData ? "Hide the pics" : "Wanna see some dog pics 'Click here!!!'?"}
          onPress={handleToggleApiData}
        />
        {showApiData && <ApiData />}
      </View>
      
    </>
    );
  }

  const styles = StyleSheet.create({
    
    form: {
      flexDirection: 'column', 
      /**backgroundColor: 'skyblue',*/
      justifyContent: 'space-between',
      alignItems: 'fit-content',
      marginHorizontal: 20,
      marginTop: 20,
    },
    
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginRight: 10,
      textAlign: 'left',
      fontSize: 16,
      color: 'black',
    },
   
  });

export default ToDoForm;