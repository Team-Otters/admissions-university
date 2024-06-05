'use server'
 
import { cookies } from 'next/headers'
 
async function createUser(data) {
  cookies().set('currentUser', data)
  // or
}

async function deleteUser(data) {
    cookies().delete('currentUser')
}