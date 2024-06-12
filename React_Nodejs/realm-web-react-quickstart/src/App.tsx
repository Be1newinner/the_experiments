import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import * as Realm from "realm-web";

const APP_ID = process.env.REACT_APP_REALM_APP_ID || "";
const app = new Realm.App({ id: APP_ID });

function App() {
  const [user, setUser] = React.useState<Realm.User | null>(app.currentUser);

  return (
    <div className="App">
      <div className="App-header">
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>
    </div>
  );
}

export default App;

// Create a component that displays the given user's details
const UserDetail = ({ user }: { user: Realm.User }) => {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
};

// Create a component that lets an anonymous user log in
type LoginProps = {
  setUser: (user: Realm.User) => void;
};

const Login = ({ setUser }: LoginProps) => {
  const loginAnonymous = async () => {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};
