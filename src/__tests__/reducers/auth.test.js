import auth from '../../redux/reducers/auth';

const initialState = { isLoggedIn: false, user: null };

describe('Site Authentication', () => {
  it('should register be successful', () => {
    expect(auth(initialState, { type: 'REGISTER_SUCCESS' })).toEqual(initialState);
  });

  it('should register be Fail', () => {
    expect(auth(initialState, { type: 'REGISTER_FAIL' })).toEqual(initialState);
  });

  it('should Login be successful', () => {
    expect(auth(initialState, { type: 'LOGIN_SUCCESS', payload: { user: { id: 1, auth_token: '1232343424234' } } })).toEqual({ isLoggedIn: true, user: { id: 1, auth_token: '1232343424234' } });
  });

  it('should login be Fail', () => {
    expect(auth(initialState, { type: 'LOGIN_FAIL' })).toEqual(initialState);
  });

  it('should logout be Fail', () => {
    expect(auth(initialState, { type: 'LOGINOUT' })).toEqual(initialState);
  });
});
