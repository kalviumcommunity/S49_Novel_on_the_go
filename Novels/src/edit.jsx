import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import './edit.css'

export default function Update() {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [book, setBook] = useState({ title: '', author: '', average_rating: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getbook/${id}`)
      .then(result => {
        setBook(result.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const onSubmit = (data) => {
    axios.put(`http://localhost:3000/updatebook/${id}`, data)
      .then(result => {
        setSubmitted(true);
        reset();
        navigate('/Resultbooks');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container3">
      <form className="register2" onSubmit={handleSubmit(onSubmit)}>
        {submitted && <div className="success-message">Book updated successfully ✅</div>}
        <input
          className="form-field"
          type="text"
          placeholder="Title"
          {...register('title', { required: "Title is required!" })}
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        <span>{errors.title?.message}</span>
        <input
          className="form-field"
          type="text"
          placeholder="Author"
          {...register('author', { required: "Author is required!" })}
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        <span>{errors.author?.message}</span>
        <input
          className="form-field"
          type="number"
          placeholder="Average Rating"
          {...register('average_rating', { required: "Average Rating is required!" })}
          value={book.average_rating}
          onChange={(e) => setBook({ ...book, average_rating: e.target.value })}
        />
        <span>{errors.average_rating?.message}</span>
        <button className="form-field1" type="submit">
          Update Book
        </button>
      </form>
    </div>
  );
}






