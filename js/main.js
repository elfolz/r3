if (location.protocol.startsWith('https')) {
	navigator.serviceWorker?.register('service-worker.js')
	navigator.serviceWorker.onmessage = m => {
		console.info('Update found!')
		if (m?.data == 'update') location.reload(true)
	}
}

function init() {
	const params = new URLSearchParams(location.search)
	const aVal = params.get('a')
	if (aVal) document.querySelector('#valor1').value = aVal
	const bVal = params.get('b')
	if (bVal) document.querySelector('#valor2').value = bVal
	const cVal = params.get('c')
	if (cVal) document.querySelector('#valor3').value = cVal
	if (aVal && bVal && cVal) refresh()
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
		el.oninput = () => refresh()
		el.classList.add('masked')
	})
}

function refresh() {
	const v1 = parseFloat(document.querySelector('#valor1')?.value?.replace(',', '.'))
	const v2 = parseFloat(document.querySelector('#valor2')?.value?.replace(',', '.'))
	const v3 = parseFloat(document.querySelector('#valor3')?.value?.replace(',', '.'))
	if (!v1 || !v2 || !v3) return
	document.querySelector('#valor4').innerHTML = (v2 * v3 / v1).toFixed(2)
}

document.onreadystatechange = () => {
	if (document.readyState == 'complete') init()
}