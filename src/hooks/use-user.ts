import React from "react";
import { api, fetcher } from "../helpers/api";
import type { User } from "../models/user";

export default function useUser() {
  const [user, setUser] = React.useState<User | null>(null);
  const [requesStatus, setRequestStatus] = React.useState<
    "idle" | "loading" | "saving"
  >("idle");

  const getUser = React.useCallback(async (username: string) => {
    try {
      setRequestStatus("loading");

      const data = await fetcher(`/users/${username}`);

      setUser(data);
    } catch (e) {
      console.error(e);
      alert("Erro ao buscar o usuario");
    } finally {
      setRequestStatus("idle");
    }
  }, []);

  async function createUser(payload: User) {
    try {
      setRequestStatus("saving");

      await api("/users", { method: "POST", body: JSON.stringify(payload) });

      alert("Usuario criado com sucesso");
    } catch (e) {
      console.error(e);
      alert("Erro ao criar usuario");
    } finally {
      setRequestStatus("idle");
    }
  }

  return {
    user,
    getUser,
    userRequestStatus: requesStatus,
    createUser,
  };
}
