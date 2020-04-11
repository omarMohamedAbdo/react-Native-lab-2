  import React, { useState } from 'react';
import { 
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   FlatList
  } from 'react-native';
import { SimpleLineIcons,FontAwesome } from '@expo/vector-icons'

export default function App() {

  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState('');
  // const [list, setList] = useState([]);
  // const [active, setActive] = useState([]);

  const pressHandler = () => {
    setTodos([...todos, { text: textInput, key: Date.now(), checked: false }])
    // setList(todos)
  };

  const allHandler = () => {
    setMode("all")
  };

  const activeHandler = () => {
    setMode("Active")
  };

  const doneHandler = () => {
    setMode("Done")
  };


  const handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
      )
      // setList(todos)
  };

  const typingHandler = (value) => {
    setTextInput(value);
  }

  return (
    <View style={styles.container}>
      <Text style={{alignSelf:"center",margin:5 , color:"red" ,fontWeight:"bold",fontSize:30}}>BABY SHARK</Text>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <TextInput
          onChangeText={typingHandler}
          value={textInput}
          placeholder="Add a To-Do"
          style={{ borderWidth: 1, width: 200 ,height:40,margin:15,backgroundColor:"white",borderRadius:20 }}
        />
        <SimpleLineIcons backgroundColor="green" size={40} name='plus' color="orange" onPress={pressHandler}></SimpleLineIcons>
      </View>
      <View style={styles.mine}>
        <TouchableOpacity 
          onPress={allHandler}
          style={styles.btn}
        >
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={activeHandler}
          style={styles.btn}
        >
          <Text>Active</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={doneHandler}
          style={styles.btn}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        extraData={mode}
        renderItem={todo => {
          if(mode == 'Active')
          {
            return !todo.item.checked && <View 
            style={{flexDirection:"row", width: 300, margin: 5 }}>
            <FontAwesome
              name={todo.item.checked ? 'check-square-o' : 'square-o'}
              size={22}
              color={todo.item.checked ? 'red' : 'white'}
              onPress={() => handleChecked(todo.item.key)}
            />
            <Text style={{ margin: 5,textDecorationLine: todo.item.checked ? "line-through" : "none" , color: todo.item.checked ? 'red' : 'white' }}>{todo.item.text}</Text>
          </View>
          }
          else if (mode == 'Done')
          {
            return todo.item.checked && <View 
            style={{flexDirection:"row", width: 300, margin: 5 }}>
            <FontAwesome
              name={todo.item.checked ? 'check-square-o' : 'square-o'}
              size={22}
              color={todo.item.checked ? 'red' : 'white'}
              onPress={() => handleChecked(todo.item.key)}
            />
            <Text style={{ margin: 5,textDecorationLine: todo.item.checked ? "line-through" : "none" , color: todo.item.checked ? 'red' : 'white' }}>{todo.item.text}</Text>
          </View>
          }
          else
          {
          return <View 
            style={{flexDirection:"row", width: 300, margin: 5 }}>
            <FontAwesome
              name={todo.item.checked ? 'check-square-o' : 'square-o'}
              size={22}
              color={todo.item.checked ? 'red' : 'white'}
              onPress={() => handleChecked(todo.item.key)}
            />
            <Text style={{ margin: 5,textDecorationLine: todo.item.checked ? "line-through" : "none" , color: todo.item.checked ? 'red' : 'white' }}>{todo.item.text}</Text>
          </View>
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#493767',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mine: {
    flexDirection:'row',
    // alignItems: 'space-around',
    justifyContent:'center',
  },
  btn: {
    margin:10,
    padding:10,
    backgroundColor:"white",
    borderRadius:15
  },
});
