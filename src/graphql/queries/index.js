import gql from 'graphql-tag'

import getAllTodos from './getAllTodos.gql'
import getTodoDetails from './getTodoDetails.gql'

export const GET_ALL_TODOS = gql`${getAllTodos}`
export const GET_TODO_DETAILS = gql`${getTodoDetails}`
