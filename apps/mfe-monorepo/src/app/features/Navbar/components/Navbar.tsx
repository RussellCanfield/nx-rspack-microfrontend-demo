import { useLayoutEffect, useState } from "React";
import styles from "./Navbar.module.css";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

type Theme = "light" | "dark";

const getColorScheme = () =>
	window.matchMedia("(prefers-color-scheme: light)").matches
		? "light"
		: "dark";

const isThemeDark = (theme: Theme) => (theme === "dark" ? true : false);

const Navbar = () => {
	useLayoutEffect(() => {
		const currentTheme = getColorScheme();
		changeTheme(currentTheme);
	}, []);

	const [theme, setTheme] = useState<Theme>(getColorScheme());

	const changeTheme = (themeName: Theme) => {
		const isNewThemeDark = isThemeDark(themeName) ? true : false;
		const body = document.querySelector("body") as HTMLBodyElement;

		body.classList.remove(isNewThemeDark ? "light-mode" : "dark-mode");
		body.classList.add(isNewThemeDark ? "dark-mode" : "light-mode");

		setTheme(themeName);
	};

	const InactiveThemeIcon = () => {
		const onClick = () =>
			isThemeDark(theme) ? changeTheme("light") : changeTheme("dark");

		return isThemeDark(theme) ? (
			<SunIcon
				className={styles["nav-bar_theme-icon"]}
				onClick={onClick}
			/>
		) : (
			<MoonIcon
				className={styles["nav-bar_theme-icon"]}
				onClick={onClick}
			/>
		);
	};

	return (
		<div className={styles["nav-bar"]}>
			<div className={styles["nav-bar_title"]}>
				<Link to="/">Elite T-Shirts</Link>
			</div>
			<div className={styles["nav-bar_links"]}>
				<Link to="/products">Products</Link>
				<Link to="/cart">Cart</Link>
			</div>
			<div className={styles["nav-bar_theme"]}>{InactiveThemeIcon()}</div>
		</div>
	);
};

export default Navbar;
