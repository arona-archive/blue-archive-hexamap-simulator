import React from 'react';
import { toast } from 'react-toastify';

export const ShareButton: React.FC = () => {
	const handleClick = async () => {
		await window.navigator.clipboard.writeText(window.location.href);
		toast.info('URL copied to clipboard');
	};

	return (
		<button type="button" className="btn btn-primary w-100" onClick={handleClick}>
			share
		</button>
	);
};
