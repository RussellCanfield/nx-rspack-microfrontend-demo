import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Home } from "./features/Home";
import { lazy, Suspense } from "react";
import { Navbar } from "./features/Navbar";

const Products = lazy(() => import("./features/Products/components/Products"));
const Cart = lazy(() => import("./features/Cart/components/Cart"));

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
			{
				path: "/cart",
				element: (
					<Suspense>
						<Cart />
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
