
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  Navigate
} from "react-router-dom";
import "./../styles/App.css";

const categories = {
  Women: [
    { id: 1, name: "Dress", description: "Women's dress collection" },
    { id: 2, name: "Tops", description: "Women's tops collection" },
    { id: 3, name: "Jeans", description: "Women's jeans collection" }
  ],
  Men: [
    { id: 1, name: "Shirts", description: "Men's shirt collection" },
    { id: 2, name: "Trousers", description: "Men's trousers collection" },
    { id: 3, name: "Jackets", description: "Men's jacket collection" }
  ]
};

function Layout() {
  return (
    <div className="main-container">
      <h1>Categories</h1>

      <nav>
        <Link to="/Women">Women</Link>
        {" | "}
        <Link to="/Men">Men</Link>
      </nav>

      <Outlet />
    </div>
  );
}

function Home() {
  return <h2>Select a category to view its items.</h2>;
}

function Category() {
  const { categoryName } = useParams();
  const items = categories[categoryName];

  if (!items) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h2>{categoryName}</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.name}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
}

function ItemDetails() {
  const { categoryName, itemName } = useParams();
  const items = categories[categoryName] || [];
  const item = items.find((entry) => entry.name === itemName);

  if (!item) {
    return <h3>Item not found</h3>;
  }

  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path=":categoryName" element={<Category />}>
            <Route path=":itemName" element={<ItemDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
