'use server'

export type SignupStatus = {
  type: 'default' | 'loading' | 'success' | 'error'
}

export async function handleSignup(previousState: SignupStatus, formData: FormData) {
  await new Promise((res) => setTimeout(res, 2000))

  if (formData.get('horseColor')?.toString().toLocaleUpperCase() === 'White'.toLocaleUpperCase()) {
    previousState.type = 'success'
  } else {
    previousState.type = 'error'
  }

  return previousState
}
