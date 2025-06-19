import { useEffect, useState } from "react";
import { User } from "../../domain/Entities/Entitie";
import { Api } from "../../data/DataSource/Api";
import { UserRepository } from "../../data/Repository/Reposiroty";
import { getUser } from "../../domain/UsesCases/Post";

export const useUserViewModel = () => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    const fetchData = async () => {
      const api = new Api();
      const repository = new UserRepository(api);
      const result = await getUser(repository);
      setUser(new User(result.name));
    };

    fetchData();
  }, []);

  return { user };
};
