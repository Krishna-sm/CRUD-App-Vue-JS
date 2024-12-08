<script setup> 
import { useTodosStore } from '@/stores/todos';
import Todo from './Todo.vue';
const todos = useTodosStore()

</script>
<template>
               <div class="container">
                <div  class=" row  justify-items-center" >
                        <div class="mb-3 col-sm-12">
                            <h1>Todos({{todos.allTodos.length}})</h1>
                        </div>
                    <Todo :key="i" :data="i" v-for="i in todos.allTodos" />
                </div>
               </div>
</template>