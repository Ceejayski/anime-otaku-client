export const handleMakeAdmin = ({ id, users }) => (
  users.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        attributes: {
          ...user.attributes,
          admin: true,
        },
      };
    }
    return user;
  })
);

export const HandleRemoveAdmin = ({ id, users }) => (
  users.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        attributes: {
          ...user.attributes,
          admin: false,
        },
      };
    }
    return user;
  })
);

export const handleUserDelete = ({ id, users }) => (
  users.filter((user) => user.id !== id)
);
export const handleAnimeDelete = ({ id, animes }) => (
  animes.filter((anime) => anime.id !== id)
);
