export function getCourseDuration(dur: number | undefined): string {
	if (!dur) return '0:00';
	const hours = Math.floor(dur / 60);
	const minutes = dur % 60;

	const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	const hourSuffix = hours === 1 ? 'hour' : 'hours';

	return `${formattedHours}:${formattedMinutes} ${hourSuffix}`;
}
