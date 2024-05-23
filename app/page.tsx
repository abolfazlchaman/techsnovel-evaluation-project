import type { Metadata } from "next";
import UserList from "./components/UsersList/UsersList";

export default function IndexPage() {
  return (
    <div>
      <UserList />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Techsnovel Dashboard",
};
