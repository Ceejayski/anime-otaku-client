import AdminReducer from '../../redux/reducers/adminBoard';

const initialState = {
  animes: [],
  users: [],
  usersAnime: [],
  favorites: [],
};

describe('Site Actions', () => {
  it('should Get Admin Animes', () => {
    expect(AdminReducer(initialState, {
      type: 'GET_ADMIN_ANIME', payload: { animes: ['anime1', 'anime2'] },
    })).toEqual({ ...initialState, animes: ['anime1', 'anime2'] });
  });

  it('should Get users favorites Animes', () => {
    expect(AdminReducer(initialState, {
      type: 'GET_USER_FAVORITE', payload: { animes: ['anime1', 'anime2'] },
    })).toEqual({ ...initialState, favorites: ['anime1', 'anime2'] });
  });

  it('should Get users favorites Animes', () => {
    expect(AdminReducer(initialState, {
      type: 'GET_USER_FAVORITE', payload: { animes: ['anime1', 'anime2'] },
    })).toEqual({ ...initialState, favorites: ['anime1', 'anime2'] });
  });

  it('should ADD to users favorites Animes', () => {
    expect(AdminReducer(initialState, {
      type: 'ADD_USER_FAVORITE', payload: { anime: { new: 'anime1' } },
    })).toEqual({ ...initialState, favorites: [{ new: 'anime1' }] });
  });
  it('should Get users favorites Animes', () => {
    expect(AdminReducer({ ...initialState, favorites: [{ id: 1, new: 'anime1' }] }, {
      type: 'REMOVE_USER_FAVORITE', payload: { anime: 1 },
    })).toEqual({ ...initialState, favorites: [] });
  });
  it('should Get users users for admin', () => {
    expect(AdminReducer(initialState, {
      type: 'GET_ADMIN_USER', payload: { users: [1, 2] },
    })).toEqual({ ...initialState, users: [1, 2] });
  });

  it('should make user admin', () => {
    expect(AdminReducer({ ...initialState, users: [{ id: 1, attributes: { admin: false } }] }, {
      type: 'MAKE_USER_ADMIN', payload: { id: 1 },
    })).toEqual({ ...initialState, users: [{ id: 1, attributes: { admin: true } }] });
  });
  it('should unmake user admin', () => {
    expect(AdminReducer({ ...initialState, users: [{ id: 1, attributes: { admin: true } }] }, {
      type: 'REMOVE_USER_ADMIN', payload: { id: 1 },
    })).toEqual({ ...initialState, users: [{ id: 1, attributes: { admin: false } }] });
  });
  it('should delete user admin', () => {
    expect(AdminReducer({ ...initialState, users: [{ id: 1, attributes: { admin: true } }] }, {
      type: 'DELETE_USER_ADMIN', payload: { id: 1 },
    })).toEqual({ ...initialState, users: [] });
  });
});
