import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./api";
import { Signup } from "./screens/Signup";
import { FindFamily } from "./screens/FindFamily";
import { Tree } from "./screens/Tree";
import { AddRelative } from "./screens/AddRelative";
import { Discover } from "./screens/Discover";
import { Notifications } from "./screens/Notifications";
import { Profile } from "./screens/Profile";
import { Messages } from "./screens/Messages";

function Private({ children }: { children: React.ReactNode }) {
  if (!getToken()) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/famille" element={<Private><FindFamily /></Private>} />
      <Route path="/arbre" element={<Private><Tree /></Private>} />
      <Route path="/ajouter-proche" element={<Private><AddRelative /></Private>} />
      <Route path="/decouvrir" element={<Private><Discover /></Private>} />
      <Route path="/notifications" element={<Private><Notifications /></Private>} />
      <Route path="/moi" element={<Private><Profile /></Private>} />
      <Route path="/messages/:personneId" element={<Private><Messages /></Private>} />
    </Routes>
  );
}
