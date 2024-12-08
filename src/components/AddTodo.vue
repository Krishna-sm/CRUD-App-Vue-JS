<script setup>
import { useTodosStore } from '@/stores/todos';
import {Form,Field,ErrorMessage} from 'vee-validate';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';
const {addTodo} = useTodosStore()

const validationSchema = yup.object({
  title:yup.string().required("Title is Required"),
  desc:yup.string().required("Description is Required"),
})
const initialValues ={
    title:'',
    desc:"", 
}

const onSubmitHandler =async(e,{resetForm})=>{
  try{
    addTodo(e.title,e.desc);
     
        resetForm();
        toast.success("Todo Added ")
  }catch(e){
    toast.error(e?.message);
  }
}

</script>
<template>
            <div class="container py-5">
                <div class="mb-3">
                    <h1>Add Todo</h1>
                </div>
               <Form v-on:submit="onSubmitHandler"  :initial-values="initialValues" :validation-schema="validationSchema"  class="col-sm-12">
                <div class="mb-3">
                    <label for=""    class="text-white">Todo Title</label>
                    <Field   name="title" class="form-control" id="" placeholder="Enter Todo Title..."/>
                    <p class="text-danger">
              <ErrorMessage name="title"/>
            </p>
                </div>
                <div class="mb-3">
                    <label for=""    class="text-white">Todo  Description</label>
                    <Field as="textarea" rows="5" name="desc" class="form-control" id="" placeholder="Enter Todo Desc..."></Field>
                    <p class="text-danger">
              <ErrorMessage name="desc"/>
            </p>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary">Add Todo</button>
                </div>
               </Form>
            </div>

</template>