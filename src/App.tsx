import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Home } from "./features/Home";
import { lazy, Suspense } from "react";
import { Navbar } from "./features/Navbar";

const Products = lazy(() => import("./features/Products/components/Products"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Navbar />
				<Outlet />
			</>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/products",
				element: (
					<Suspense>
						<Products />
					</Suspense>
				),
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
