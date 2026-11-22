import React from 'react'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Spinner } from '../components/atoms/Spinner'
import { Logo } from '../components/atoms/Logo'
import { FilterTabs } from '../components/molecules/FilterTabs'
import { FormField } from '../components/molecules/FormField'
import { TodoItem } from '../components/molecules/TodoItem'
import { useGetTodosQuery } from '../features/todos/todosApi'

export function TodosPage() {
    const { data, isLoading, isFetching, error, refetch } = useGetTodosQuery();
    console.log("🚀 ~ TodosPage ~ data:", data)
  return (
    <div>
      <Badge done={true} />
      <Button variant="primary" color="primary">test</Button>
      <Logo />  
      <Spinner label="Loading..." />
      <FilterTabs counts={{ all: 5, active: 3, completed: 2 }} />
      <FormField label="Task title" name="title" value="" onChange={() => {}} />
      {/* <TodoItem todo={{ id: 1, title: 'Test task', description: 'This is a test task', done: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }} onEdit={() => {}} onDelete={() => {}}  onNotify={() => {}}/> */}
    </div>
  )
}


