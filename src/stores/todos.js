import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTodosStore = defineStore('todos',()=>{
    const todos= ref(JSON.parse(localStorage.getItem("todos")||"[]"));

    const addTodo=(title,desc)=>{
        const item = {
            title,
            desc,
            isComplete:false,
            id:new Date().getTime()
        }
        todos.value.push(item)
        localStorage.setItem("todos",JSON.stringify(todos.value))
    }
    const completeTodo=(id)=>{

        const all_todos =   todos.value.map((cur,i)=>{
            if(cur.id ===id){
                return {
                    ...cur,
                    isComplete:!cur.isComplete
                }
            }
            return cur
        })
        todos.value = all_todos
        localStorage.setItem("todos",JSON.stringify(todos.value))


    }
    const editTodo=(title,desc,id)=>{
        const all_todos =   todos.value.map((cur,i)=>{
            if(cur.id ===id){
                return {
                    ...cur,
                    title,desc 
                }
            }
            return cur
        })
        todos.value = all_todos
        localStorage.setItem("todos",JSON.stringify(todos.value))

    }
    const deleteTodo=(id)=>{
        
        const all_todos =   todos.value.filter((cur)=>cur.id!==id)
        todos.value = all_todos
        localStorage.setItem("todos",JSON.stringify(todos.value))


    }
    const allTodos = computed(()=>todos.value)

    return {
        todos,
        addTodo,
        editTodo,
        completeTodo,
        deleteTodo,
        allTodos
    }


})