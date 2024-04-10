if (location.protocol.startsWith('https')) {
	navigator.serviceWorker?.register('service-worker.js')
	navigator.serviceWorker.onmessage = m => {
		console.info('Update found!')
		if (m?.data == 'update') location.reload(true)
	}
}

let installPWAPrompt

window.addEventListener('beforeinstallprompt', e => {
	e.preventDefault()
	installPWAPrompt = e
})

function init() {
	document.querySelectorAll('input').forEach(el => {
		if (el.classList.contains('masked')) return
		IMask(el, {
			mask: Number,
			scale: 2,
			thousandsSeparator: '',
			padFractionalZeros: false,
			normalizeZeros: true,
			autofix: true,
			radix: '.',
			mapToRadix: ['.', ',']
		})
		el.oninput = () => {
			const v1 = parseFloat(document.querySelector('#valor1')?.value?.replace(',', '.'))
			const v2 = parseFloat(document.querySelector('#valor2')?.value?.replace(',', '.'))
			const v3 = parseFloat(document.querySelector('#valor3')?.value?.replace(',', '.'))
			if (!v1 || !v2 || !v3) return
			document.querySelector('#valor4').innerHTML = (v2 * v3 / v1).toFixed(2)
		}
		el.classList.add('masked')
	})
	document.querySelector('#installPWA').onclick = e => {
		if (!installPWAPrompt) return
		installPWAPrompt.prompt()
		installPWAPrompt = undefined
	}
}

document.onreadystatechange = () => {
	if (document.readyState == 'complete') init()
}