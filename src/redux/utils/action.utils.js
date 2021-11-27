export const animeFinder = (animeList, slug) => {
  animeList.filter((single) => {
    console.log(single.attributes.slug === slug);

    return single.attributes.slug === slug;
  });
};

export const handleMakeAdmin = ({ id, users }) =>
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
  });

export const HandleRemoveAdmin = ({ id, users }) =>
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
  });

export const handleAddFave = ({ current, newFave }) => [...current, newFave];

export const handleRemoveFave = ({ current, Fave }) => current.filter((anime) => anime.id !== Fave);

export const handleUserDelete = ({ id, users }) => users.filter((user) => user.id !== id);
export const handleAnimeDelete = ({ id, animes }) => animes.filter((anime) => anime.id !== id);
