import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./Firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl `,
  button: ` p-4 ml-2 bg-purple-500`,
  count: `text-center p-2`,
};

const App = () => {
  const [todos, settodos] = useState([]);
  const [input, setInput] = useState("");

  // delete todo

 const deleteTodo=async(id
  )=>(
  await deleteDoc(doc(db,'todo',id)
 ))

  

  // create todo:

  const createtodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("enter a value");
      return
    }
    await addDoc(collection(db,'todo'),{
      text:input,
      completed:false,
    })
    setInput('')
  };

  // update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todo", todo.id), {
      completed: !todo.completed,
    });
  };

  // read todo from firebase

  useEffect(() => {
    const q = query(collection(db, "todo"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoarr = [];
      querySnapshot.forEach((doc) => {
        todoarr.push({ ...doc.data(), id: doc.id });
      });
      settodos(todoarr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createtodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}/>
          ))}
        </ul>
        <p className={style.count}>You have {todos.length} todos</p>
      </div>
    </div>
  );
};

export default App;
