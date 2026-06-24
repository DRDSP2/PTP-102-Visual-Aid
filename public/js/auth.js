import { supabase } from './supabase-client.js'

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) throw error
    return data
}

export async function logout() {
    await supabase.auth.signOut()
    window.location.reload()
}

export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
}

export function initAuth() {
    const loginForm = document.getElementById('login-form')
    const loginError = document.getElementById('login-error')
    const loginScreen = document.getElementById('login-screen')
    const appScreen = document.getElementById('app-screen')
    const logoutBtn = document.getElementById('logout-btn')

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value
        try {
            await login(email, password)
            loginScreen.classList.remove('active')
            appScreen.classList.add('active')
            window.dispatchEvent(new Event('auth-success'))
        } catch (err) {
            loginError.textContent = err.message
        }
    })

    logoutBtn.addEventListener('click', logout)

    // Check existing session
    getSession().then(session => {
        if (session) {
            loginScreen.classList.remove('active')
            appScreen.classList.add('active')
            window.dispatchEvent(new Event('auth-success'))
        }
    })
}
