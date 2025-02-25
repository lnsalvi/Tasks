import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Define the system path.
const __dirname = dirname(fileURLToPath(import.meta.url))

let Tasks = []

export const SaveTask = (task) => {
  const filePath = path.join(__dirname, 'data.json')

  if (!task) throw new Error('You have not submitted a task to save')
    
  Tasks.push(task)

  try {
    // Escribir de nuevo el archivo JSON
    fs.writeFile(filePath, JSON.stringify(Tasks, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error al escribir el archivo:', writeErr)
        return
      }
      console.log('Tarea agregada con éxito.')
    })
  } catch (error) {
    console.log(error.message)
  }

  return {
    statusSaveBD: 10001,
    message: "The task was successfully saved to the database"
  }
}

export const ReturnTasks = () => {
  return Tasks
}

export const GetTasksByCondition = (currentDate) => {
  let tasksToBeSent = []

  Tasks.forEach(element => {
    if (element.noticeDate === currentDate && !element.emailsSent) tasksToBeSent.push(element)
  })

  return tasksToBeSent
}

export const CloseTaskNotice = (emailsStatus) => {
  emailsStatus.forEach(element => {
    let task = Tasks.find(e => e.id === element.id)
    if (task && element.shippingStatus) task.emailsSent = true
  })
}

export const UpdateTasks = () => {
  const filePath = path.join(__dirname, 'data.json')

  // Lee el archivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err)
      return
    }

    // Parsea el contenido JSON
    try {
      Tasks = JSON.parse(data)
    } catch (parseErr) {
      console.error('Error al parsear el JSON:', parseErr)
    }
  })

  console.log("** Tareas actualizadas **")
}
