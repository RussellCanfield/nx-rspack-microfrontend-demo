import { useLayoutEffect, useState } from "react";

const useScreenSize = ({ htmlElement }: { htmlElement: HTMLElement }) => {
	const [isSmallScreen, setSmallScreen] = useState<Boolean>(false);

	useLayoutEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;

			const onSmallScreenSize =
				entry.contentRect.width < 1024 ? true : false;

			setSmallScreen(onSmallScreenSize);
		});

		resizeObserver.observe(htmlElement);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return {
		isSmallScreen,
	};
};

export default useScreenSize;
