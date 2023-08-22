export function formatDate(d: Date) {
	const date = d.getDate();
	const month = d.getMonth() + 1;
	const year = d.getFullYear();

	return `${String(month).padStart(2, '0')}/${String(date).padStart(
		2,
		'0'
	)}/${year}`;
}
