<script setup>
import { toast } from 'vue3-toastify';
import {Form,ErrorMessage,Field} from 'vee-validate'
import * as yup from 'yup' 
import { useTodosStore } from '@/stores/todos';
const modelId = "Element"+`${new Date().getTime()+Math.floor(Math.random()*898558)}`
const TodoStore = useTodosStore()

const { data } = defineProps(['data']);
const completeTodo=(id)=>{
  TodoStore.completeTodo(id)
    toast.success("todo Completed")
}


const deleteTodo=(id)=>{
  TodoStore.deleteTodo(id)
    toast.success("todo deleted")
}
const initialValues = {
  title: data?.title || '',
  desc: data?.desc || ''
};
const ValidationSchema = yup.object({
    title:yup.string().required("Title is Required"),
    desc:yup.string().required("Description is required")
})

const handleSubmit =(e,{resetForm})=>{
        TodoStore.editTodo(e.title,e.desc,data.id);
        toast.success("form submit")
        
}


</script>
<template>
  <div class="col-sm-12 col-md-3 mx-auto  p-2">
    <div class="card  ">
                            <div class="card-header">
                                <h1 :class="data.isComplete?'text-decoration-line-through':''">{{data&& data.title}}</h1>
                            </div>
                            <div class="card-body">
                                {{data &&data.desc}}
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-danger mx-1" @click="deleteTodo(data.id)">delete</button>
                                <button  class="btn btn-secondary mx-1" @click="completeTodo(data.id)">Complete</button>
                                <button data-bs-toggle="modal" :data-bs-target="`#`+modelId" class="btn btn-success mx-1">Edit</button>

                                     <!--model  -->
                                     <div class="modal fade" :id="modelId" tabindex="-1" :aria-labelledby="modelId" aria-hidden="true">
  <div class="modal-dialog">
    <Form v-on:submit="handleSubmit" :validation-schema="ValidationSchema" :initial-values="initialValues" class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
                <div class="mb-3">
                    <label for="">Title</label>
                    <Field type="text"  name="title" class="form-control"/>
                    <p class="text-danger">
                        <ErrorMessage name="title"  />
                    </p>
                </div>
                <div class="mb-3">
                    <label for="">Desc</label>
                    <Field as="textarea" rows="4" class="form-control" name="desc"></Field>  
                </div>
                <div class="mb-3 d-flex  justify-content-end  ">
                    <button type="submit" class="btn btn-primary btn-block "  data-bs-dismiss="modal" style="width: 100%;">Update</button>
                </div>
      </div>
      
    </Form>
  </div>
</div>
                                     <!--set model  -->



                            </div>
                    </div>
  </div>
</template>