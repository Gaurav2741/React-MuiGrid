import React, { useState } from 'react';
import { ADD_USER } from '../Queries';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { toDateStr, fileToBase64 } from '../Convert';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [content, setContent] = useState('');
  const [joiningDate, setJoiningDate] = useState(null);

  const navigate = useNavigate();
  const [addUser] = useMutation(ADD_USER);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      fileToBase64(e.target.files[0], function (base64Data) {
        setContent(base64Data);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !jobTitle || !joiningDate) {
      alert('All fields are required!');
      return;
    }

    try {
      await addUser({
        variables: {
          name,
          email,
          job_title: jobTitle,
          joining_date: toDateStr(joiningDate),
          content,
        },
      });
      navigate('/');
    } catch (error) {
      alert(`Failed to add user: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add New User</h3>
      <Form className="mx-auto" style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicJobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicJoiningDate">
          <Form.Label>Joining Date</Form.Label>
          <div>
            <DatePicker
              selected={joiningDate}
              onChange={(date) => setJoiningDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label>Upload Profile Picture</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        {content && (
          <div className="mb-3">
            <Form.Label>Preview:</Form.Label>
            <img src={content} alt="preview" width={75} height={75} />
          </div>
        )}

        <div className="d-flex justify-content-between">
          <Link to="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
