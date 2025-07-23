// src/Queries/index.js
import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      job_title
      email
      joining_date
      content
    }
  }
`;

export const VIEW_USER = gql`
  query GetUser($id: Int) {
    getUser(id: $id) {
      id
      name
      job_title
      email
      joining_date
      content
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($name: String, $email: String, $job_title: String, $joining_date: String, $content: String) {
    createUser(name: $name, email: $email, job_title: $job_title, joining_date: $joining_date, content: $content) {
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation UpdateUser($id: Int, $name: String, $email: String, $job_title: String, $joining_date: String, $content: String) {
    updateUser(id: $id, name: $name, email: $email, job_title: $job_title, joining_date: $joining_date, content: $content) {
      id
    }
  }
`;

// src/Queries/index.js


export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

