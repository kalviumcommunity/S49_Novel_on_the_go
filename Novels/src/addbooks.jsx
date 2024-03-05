import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './addbooks.css'

const AddBookForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/createbooks', data);
      setSubmitted(true);
      reset(); 
      navigate('/Resultbooks')
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='container1'>
      <h3>Add New Book</h3>
      <form className="register1" onSubmit={handleSubmit(onSubmit)}>
        {submitted && <div className="success">Book added successfully ✅</div>}
        <label>
          Title:
          <input
            className="form"
            type="text"
            name="title"
            {...register('title', { required: "Title is required" })}
          />
          <span>{errors.title && errors.title.message}</span>
        </label>

        <label>
          Author:
          <input
            className="form"
            type="text"
            name="author"
            {...register('author', { required: "Author is required" })}
          />
          <span>{errors.author && errors.author.message}</span>
        </label>

        <label>
          Average Rating:
          <input
            className="form"
            type="number"
            name="average_rating"
            {...register('average_rating', { required: "Average Rating is required" })}
          />
          <span>{errors.average_rating && errors.average_rating.message}</span>
        </label>

        <button className="form-field" type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
