import { supabase } from './supabase-client.js'

// Pin data for different severities
const pinData = {
    normal: [
        { id: 1, x: 30, y: 20, label: 'HPA', description: 'Horn-Papillary Angle: Normal ~20-25°', category: 'rotation' },
        { id: 2, x: 50, y: 30, label: 'DS', description: 'Dorsal Surface: Smooth, regular contour', category: 'rotation' },
        { id: 3, x: 70, y: 40, label: 'SD', description: 'Sole Depth: Normal ~15-20mm', category: 'sinking' },
        { id: 4, x: 40, y: 60, label: 'PA', description: 'Palmar Angle: Normal ~3-5°', category: 'rotation' },
        { id: 5, x: 60, y: 70, label: 'FD', description: 'Founder Distance: Normal <5mm', category: 'sinking' },
        { id: 6, x: 25, y: 45, label: 'C', description: 'Coronary Band: Normal position', category: 'chronic' },
        { id: 7, x: 75, y: 25, label: 'W', description: 'Wall: Normal thickness ~10-15mm', category: 'chronic' },
        { id: 8, x: 55, y: 50, label: 'L', description: 'Laminae: Tight, regular spacing', category: 'chronic' },
        { id: 9, x: 35, y: 75, label: 'F', description: 'Frog: Normal triangular shape', category: 'chronic' },
        { id: 10, x: 65, y: 15, label: 'P3', description: 'P3 (Coffin Bone): Normal position', category: 'rotation' }
    ],
    mild: [
        { id: 1, x: 30, y: 20, label: 'HPA', description: 'Horn-Papillary Angle: Mild increase ~25-30°', category: 'rotation' },
        { id: 2, x: 50, y: 30, label: 'DS', description: 'Dorsal Surface: Slight convexity beginning', category: 'rotation' },
        { id: 3, x: 70, y: 40, label: 'SD', description: 'Sole Depth: Mild decrease ~12-15mm', category: 'sinking' },
        { id: 4, x: 40, y: 60, label: 'PA', description: 'Palmar Angle: Mild increase ~5-8°', category: 'rotation' },
        { id: 5, x: 60, y: 70, label: 'FD', description: 'Founder Distance: Mild increase ~5-8mm', category: 'sinking' },
        { id: 6, x: 25, y: 45, label: 'C', description: 'Coronary Band: Slight displacement', category: 'chronic' },
        { id: 7, x: 75, y: 25, label: 'W', description: 'Wall: Slight thickening', category: 'chronic' },
        { id: 8, x: 55, y: 50, label: 'L', description: 'Laminae: Early separation signs', category: 'chronic' },
        { id: 9, x: 35, y: 75, label: 'F', description: 'Frog: Slight compression', category: 'chronic' },
        { id: 10, x: 65, y: 15, label: 'P3', description: 'P3: Early rotation signs', category: 'rotation' }
    ],
    moderate: [
        { id: 1, x: 30, y: 20, label: 'HPA', description: 'Horn-Papillary Angle: Moderate increase ~30-35°', category: 'rotation' },
        { id: 2, x: 50, y: 30, label: 'DS', description: 'Dorsal Surface: Obvious convexity', category: 'rotation' },
        { id: 3, x: 70, y: 40, label: 'SD', description: 'Sole Depth: Moderate decrease ~8-12mm', category: 'sinking' },
        { id: 4, x: 40, y: 60, label: 'PA', description: 'Palmar Angle: Moderate increase ~8-12°', category: 'rotation' },
        { id: 5, x: 60, y: 70, label: 'FD', description: 'Founder Distance: Moderate increase ~8-12mm', category: 'sinking' },
        { id: 6, x: 25, y: 45, label: 'C', description: 'Coronary Band: Obvious displacement', category: 'chronic' },
        { id: 7, x: 75, y: 25, label: 'W', description: 'Wall: Moderate thickening, rings', category: 'chronic' },
        { id: 8, x: 55, y: 50, label: 'L', description: 'Laminae: Moderate separation', category: 'chronic' },
        { id: 9, x: 35, y: 75, label: 'F', description: 'Frog: Moderate compression, recession', category: 'chronic' },
        { id: 10, x: 65, y: 15, label: 'P3', description: 'P3: Moderate rotation, tip near sole', category: 'rotation' }
    ],
    severe: [
        { id: 1, x: 30, y: 20, label: 'HPA', description: 'Horn-Papillary Angle: Severe increase >35°', category: 'rotation' },
        { id: 2, x: 50, y: 30, label: 'DS', description: 'Dorsal Surface: Severe convexity, "dished"', category: 'rotation' },
        { id: 3, x: 70, y: 40, label: 'SD', description: 'Sole Depth: Severe decrease <8mm', category: 'sinking' },
        { id: 4, x: 40, y: 60, label: 'PA', description: 'Palmar Angle: Severe increase >12°', category: 'rotation' },
        { id: 5, x: 60, y: 70, label: 'FD', description: 'Founder Distance: Severe increase >12mm', category: 'sinking' },
        { id: 6, x: 25, y: 45, label: 'C', description: 'Coronary Band: Severe displacement, edema', category: 'chronic' },
        { id: 7, x: 75, y: 25, label: 'W', description: 'Wall: Severe thickening, prominent rings', category: 'chronic' },
        { id: 8, x: 55, y: 50, label: 'L', description: 'Laminae: Severe separation, destruction', category: 'chronic' },
        { id: 9, x: 35, y: 75, label: 'F', description: 'Frog: Severe compression, necrosis risk', category: 'chronic' },
        { id: 10, x: 65, y: 15, label: 'P3', description: 'P3: Severe rotation, tip penetrating sole', category: 'rotation' }
    ]
}

// SVG overlay paths for each severity
const overlayPaths = {
    normal: [
        { d: 'M 30 20 L 50 30 L 70 40', stroke: '#22c55e', width: 2 },
        { d: 'M 40 60 L 60 70', stroke: '#22c55e', width: 2 }
    ],
    mild: [
        { d: 'M 30 20 L 50 30 L 70 40', stroke: '#eab308', width: 2 },
        { d: 'M 40 60 L 60 70', stroke: '#eab308', width: 2 },
        { d: 'M 25 45 L 35 75', stroke: '#eab308', width: 1, dash: '5,5' }
    ],
    moderate: [
        { d: 'M 30 20 L 50 30 L 70 40', stroke: '#f97316', width: 3 },
        { d: 'M 40 60 L 60 70', stroke: '#f97316', width: 3 },
        { d: 'M 25 45 L 35 75', stroke: '#f97316', width: 2, dash: '5,5' },
        { d: 'M 55 50 L 75 25', stroke: '#f97316', width: 2 }
    ],
    severe: [
        { d: 'M 30 20 L 50 30 L 70 40', stroke: '#ef4444', width: 4 },
        { d: 'M 40 60 L 60 70', stroke: '#ef4444', width: 4 },
        { d: 'M 25 45 L 35 75', stroke: '#ef4444', width: 3, dash: '5,5' },
        { d: 'M 55 50 L 75 25', stroke: '#ef4444', width: 3 },
        { d: 'M 65 15 L 50 30', stroke: '#ef4444', width: 2 }
    ]
}

let currentSeverity = 'normal'
let currentFilter = 'all'
let currentHoof = 'FL'
let currentHorse = null
let currentScans = []
let currentScanIndex = 0

export function initVisualAid() {
    initSeverityButtons()
    initPinFilters()
    initHoofSelector()
    initImageControls()
    initUploadZone()
    initDateNav()
    renderPins()
    renderOverlay()
}

function initSeverityButtons() {
    const buttons = document.querySelectorAll('.severity-btn')
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            currentSeverity = btn.dataset.severity
            renderPins()
            renderOverlay()
        })
    })
}

function initPinFilters() {
    const buttons = document.querySelectorAll('.filter-btn')
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            currentFilter = btn.dataset.filter
            renderPins()
        })
    })
}

function initHoofSelector() {
    const buttons = document.querySelectorAll('.hoof-btn')
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            currentHoof = btn.dataset.hoof
            loadPatientScans()
        })
    })
}

function initImageControls() {
    let zoom = 1
    let brightness = 1
    const patientImage = document.getElementById('patient-image')
    
    document.getElementById('zoom-in').addEventListener('click', () => {
        zoom += 0.1
        patientImage.style.transform = `scale(${zoom})`
    })
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        zoom = Math.max(0.5, zoom - 0.1)
        patientImage.style.transform = `scale(${zoom})`
    })
    
    document.getElementById('brightness-up').addEventListener('click', () => {
        brightness += 0.1
        patientImage.style.filter = `brightness(${brightness})`
    })
    
    document.getElementById('brightness-down').addEventListener('click', () => {
        brightness = Math.max(0.5, brightness - 0.1)
        patientImage.style.filter = `brightness(${brightness})`
    })
    
    document.getElementById('reset-view').addEventListener('click', () => {
        zoom = 1
        brightness = 1
        patientImage.style.transform = 'scale(1)'
        patientImage.style.filter = 'brightness(1)'
    })
}

function initUploadZone() {
    const uploadZone = document.getElementById('upload-zone')
    const fileInput = document.getElementById('file-input')
    
    uploadZone.addEventListener('click', () => fileInput.click())
    
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault()
        uploadZone.style.borderColor = 'var(--accent-green)'
    })
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = 'var(--border-color)'
    })
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault()
        uploadZone.style.borderColor = 'var(--border-color)'
        const files = e.dataTransfer.files
        if (files.length) handleUpload(files[0])
    })
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleUpload(e.target.files[0])
    })
}

async function handleUpload(file) {
    if (!currentHorse) {
        alert('Please select a horse first')
        return
    }
    
    try {
        const fileName = `${currentHorse.id}/${currentHoof}/${Date.now()}_${file.name}`
        const { data, error } = await supabase.storage
            .from('xray-images')
            .upload(fileName, file)
        
        if (error) throw error
        
        const { data: { publicUrl } } = supabase.storage
            .from('xray-images')
            .getPublicUrl(fileName)
        
        const { error: dbError } = await supabase
            .from('scans')
            .insert({
                horse_id: currentHorse.id,
                hoof: currentHoof,
                view: 'Lateral',
                modality: 'DX',
                description: 'Uploaded X-ray',
                scan_date: new Date().toISOString().split('T')[0],
                image_url: publicUrl
            })
        
        if (dbError) throw dbError
        
        loadPatientScans()
    } catch (err) {
        alert('Upload failed: ' + err.message)
    }
}

function initDateNav() {
    document.getElementById('prev-date').addEventListener('click', () => {
        if (currentScanIndex > 0) {
            currentScanIndex--
            showCurrentScan()
        }
    })
    
    document.getElementById('next-date').addEventListener('click', () => {
        if (currentScanIndex < currentScans.length - 1) {
            currentScanIndex++
            showCurrentScan()
        }
    })
}

function renderPins() {
    const container = document.getElementById('pins-container')
    container.innerHTML = ''
    
    const pins = pinData[currentSeverity] || pinData.normal
    pins.forEach(pin => {
        if (currentFilter !== 'all' && pin.category !== currentFilter) return
        
        const pinEl = document.createElement('div')
        pinEl.className = 'pin'
        pinEl.textContent = pin.id
        pinEl.style.left = `${pin.x}%`
        pinEl.style.top = `${pin.y}%`
        pinEl.style.background = getSeverityColor(currentSeverity)
        
        pinEl.addEventListener('mouseenter', (e) => showTooltip(e, pin))
        pinEl.addEventListener('mouseleave', hideTooltip)
        
        container.appendChild(pinEl)
    })
}

function renderOverlay() {
    const svg = document.getElementById('reference-overlay')
    svg.innerHTML = ''
    
    const paths = overlayPaths[currentSeverity] || overlayPaths.normal
    paths.forEach(path => {
        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        pathEl.setAttribute('d', path.d)
        pathEl.setAttribute('stroke', path.stroke)
        pathEl.setAttribute('stroke-width', path.width)
        pathEl.setAttribute('fill', 'none')
        if (path.dash) pathEl.setAttribute('stroke-dasharray', path.dash)
        svg.appendChild(pathEl)
    })
}

function getSeverityColor(severity) {
    const colors = {
        normal: '#22c55e',
        mild: '#eab308',
        moderate: '#f97316',
        severe: '#ef4444'
    }
    return colors[severity] || colors.normal
}

function showTooltip(e, pin) {
    const tooltip = document.getElementById('tooltip')
    tooltip.innerHTML = `
        <h3>${pin.label}</h3>
        <p>${pin.description}</p>
    `
    tooltip.style.left = `${e.clientX + 10}px`
    tooltip.style.top = `${e.clientY + 10}px`
    tooltip.classList.add('visible')
}

function hideTooltip() {
    document.getElementById('tooltip').classList.remove('visible')
}

export async function loadHorses() {
    const { data, error } = await supabase.from('horses').select('*').order('name')
    if (error) {
        console.error('Failed to load horses:', error)
        return
    }
    
    const dropdown = document.getElementById('horse-dropdown')
    dropdown.innerHTML = '<option value="">Select Horse...</option>'
    data.forEach(horse => {
        const option = document.createElement('option')
        option.value = horse.id
        option.textContent = horse.name
        dropdown.appendChild(option)
    })
    
    dropdown.addEventListener('change', (e) => {
        const horseId = e.target.value
        if (horseId) {
            currentHorse = data.find(h => h.id === horseId)
            loadPatientScans()
        }
    })
}

async function loadPatientScans() {
    if (!currentHorse) return
    
    const { data, error } = await supabase
        .from('scans')
        .select('*')
        .eq('horse_id', currentHorse.id)
        .eq('hoof', currentHoof)
        .order('scan_date', { ascending: true })
    
    if (error) {
        console.error('Failed to load scans:', error)
        return
    }
    
    currentScans = data || []
    currentScanIndex = currentScans.length - 1
    
    renderTimeline()
    showCurrentScan()
}

function renderTimeline() {
    const timeline = document.getElementById('date-timeline')
    timeline.innerHTML = ''
    
    currentScans.forEach((scan, index) => {
        const dot = document.createElement('div')
        dot.className = 'timeline-dot'
        if (index === currentScanIndex) dot.classList.add('active')
        dot.addEventListener('click', () => {
            currentScanIndex = index
            showCurrentScan()
        })
        timeline.appendChild(dot)
    })
}

function showCurrentScan() {
    const patientImage = document.getElementById('patient-image')
    const uploadZone = document.getElementById('upload-zone')
    
    if (currentScans.length === 0) {
        patientImage.src = ''
        uploadZone.classList.remove('hidden')
        return
    }
    
    uploadZone.classList.add('hidden')
    const scan = currentScans[currentScanIndex]
    patientImage.src = scan.image_url || ''
    
    // Update timeline dots
    document.querySelectorAll('.timeline-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentScanIndex)
    })
}
