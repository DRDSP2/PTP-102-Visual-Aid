import { initAuth } from './auth.js'
import { initVisualAid, loadHorses } from './visual-aid.js'

window.addEventListener('DOMContentLoaded', () => {
    initAuth()
    
    window.addEventListener('auth-success', () => {
        initVisualAid()
        loadHorses()
    })
})
