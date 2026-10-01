import React from "react";
import useUser from "../hooks/use-user";

export default function UserInfo() {
  const { user, userRequestStatus, getUser } = useUser();

  React.useEffect(() => {
    getUser("nai");
  }, [getUser]);

  if (userRequestStatus === "loading") {
    return <div>Carregando usuario...</div>;
  }

  return (
    <ul>
      <li>Nome: {user?.name}</li>
      <li>Username (id): {user?.id}</li>
    </ul>
  );
}
