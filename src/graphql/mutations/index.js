import gql from 'graphql-tag'

import createTodo from './createTodo.gql'
import deleteTodo from './deleteTodo.gql'
import markComplete from './markComplete.gql'
import updateTodo from './updateTodo.gql'

export const CREATE_TODOS = gql`${createTodo}`
export const DELETE_TODO = gql`${deleteTodo}`
export const MARK_COMPLETE = gql`${markComplete}`
export const UPDATE_TODO = gql`${updateTodo}`
