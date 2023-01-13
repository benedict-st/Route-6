import React from "react";

import {
  useParams,
  NavLink,
  useRoutes,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "users",
      element: <UsersLayout />,
      children: [
        {
          index: true,
          element: <UserListPage />,
        },
        {
          path: ":userID",
          element: <Outlet />,
          children: [
            {
              path: "profile",
              element: <UsersProfilePage />,
            },
            {
              path: "edit",
              element: <EditUserPage />,
            },
            { index: true, element: <Navigate to="./profile" /> },
            { path: "*", element: <Navigate to="../profile" /> },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);
  return (
    <div className="App">
      <h3>React Router 6</h3>
      <NavLink to="/users">Users list Page</NavLink>
      {routes}
    </div>
  );
}

function MainPage() {
  return (
    <>
      <h3>MainPage </h3>
    </>
  );
}
function UsersLayout() {
  return (
    <div>
      <h3>Users Layout</h3>
      <NavLink to="/">Main Page</NavLink>
      <Outlet />
    </div>
  );
}
function UserListPage() {
  return (
    <>
      <h3>UserList Page</h3>

      <ul>
        {new Array(5).fill().map((_, index) => (
          <li key={"user_" + index}>
            <NavLink to={index + "/profile"}>User {index} </NavLink>
          </li>
        ))}
      </ul>

      <NavLink to={"/"}> Main Page</NavLink>
    </>
  );
}

function UsersProfilePage() {
  const { userID } = useParams();

  return (
    <>
      <h3>UsersProfile page</h3>
      <div>userId : {userID}</div>
      <p>
        <NavLink to="/users"> Users List page</NavLink>
      </p>
      <p>
        <NavLink to={`/users/${userID}/edit`}> Edit Users List page</NavLink>
      </p>
    </>
  );
}

function EditUserPage() {
  const { userID } = useParams();
  return (
    <>
      <h3>EditUserPage page</h3>
      <div>userId : {userID}</div>
      <ul>
        <li>
          <NavLink to={"/users/" + userID}>User profile Page</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userID + 1)}> Another User</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}> Users List page</NavLink>
        </li>
      </ul>
    </>
  );
}

export default App;
