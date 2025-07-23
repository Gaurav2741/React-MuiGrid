import React, { Fragment, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER, VIEW_USER } from '../Queries';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fileToBase64, toDateStr, blobToBase64 } from '../Convert';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Edit() {
    const navigate = useNavigate();

    const [uid, setUId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        jobTitle: '',
        joiningDate: '',
        content: ''
    });

    const [imageError, setImageError] = useState(false);

    // Get user ID from local storage
    useEffect(() => {
        const storedId = localStorage.getItem('id');
        if (storedId) {
            setUId(parseInt(storedId));
        }
    }, []);

    // GraphQL query
    const { data, loading, error } = useQuery(VIEW_USER, {
        variables: { id: uid },
        skip: !uid
    });

    // Populate form from API
    useEffect(() => {
        const loadData = async () => {
            if (data?.getUser) {
                const user = data.getUser;
                const contentBase64 = await blobToBase64(user.content);
                setForm({
                    name: user.name,
                    email: user.email,
                    jobTitle: user.job_title,
                    joiningDate: toDateStr(new Date(user.joining_date)),
                    content: contentBase64 || ''
                });
            }
        };
        loadData();
    }, [data]);

    const [editUser] = useMutation(EDIT_USER);

    // Form field change handler
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target?.files?.[0]) {
            const file = e.target.files[0];
            fileToBase64(file, base64 => {
                handleChange('content', base64);
                setImageError(false);
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editUser({
                variables: {
                    id: uid,
                    name: form.name,
                    email: form.email,
                    job_title: form.jobTitle,
                    joining_date: form.joiningDate,
                    content: form.content
                }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error updating user.');
        }
    };

    if (!uid) return <Alert variant="warning">User ID not found in local storage</Alert>;
    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">Error fetching user data.</Alert>;

    return (
        <div className="container mt-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        type="text"
                        placeholder="Enter Name"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        type="email"
                        placeholder="Enter Email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        value={form.jobTitle}
                        onChange={e => handleChange('jobTitle', e.target.value)}
                        type="text"
                        placeholder="Enter Job Title"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Joining Date:</Form.Label>
                    <DatePicker
                        selected={new Date(form.joiningDate)}
                        onChange={date => handleChange('joiningDate', toDateStr(date))}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="file"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                {form.content && !imageError && (
                    <img
                        src={form.content}
                        alt="Preview"
                        width={75}
                        height={75}
                        onError={() => setImageError(true)}
                        className="mb-3"
                    />
                )}

                <div className="d-flex justify-content-between">
                    <Link to="/">
                        <Button variant="secondary">Home</Button>
                    </Link>
                    <Button type="submit" variant="warning">Update</Button>
                </div>
            </Form>
        </div>
    );
}

export default Edit;
