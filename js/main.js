if (location.protocol.startsWith('https')) {
	navigator.serviceWorker?.register('service-worker.js')
	navigator.serviceWorker.onmessage = m => {
		console.info('Update found!')
		if (m?.data == 'update') location.reload(true)
	}
}

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
			const v1 = parseInt(document.querySelector('#valor1')?.value)
			const v2 = parseInt(document.querySelector('#valor2')?.value)
			const v3 = parseInt(document.querySelector('#valor3')?.value)
			if (!v1 || !v2 || !v3) return
			document.querySelector('#valor4').innerHTML = (v2 * v3 / v1).toFixed(2)
		}
		el.classList.add('masked')
	})
}

document.onreadystatechange = () => {
	if (document.readyState == 'complete') init()
}