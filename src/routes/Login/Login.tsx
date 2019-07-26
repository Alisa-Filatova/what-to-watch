import React, { RefObject } from 'react';
import { observer } from 'mobx-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { IUserRequest } from '../../types';

const EMAIL_REGEXP = new RegExp('^([a-z0-9_-]+)*[a-z0-9_-]+@[a-z0-9_-]+([a-z0-9_-]+)*[a-z]{2,6}$');
const ERROR_COLOR = 'red';
const BASE_COLOR = 'green';

interface Props {
  onLogin: (user: IUserRequest) => void;
}

@observer
class Login extends React.PureComponent<Props> {

  emailInput: RefObject<HTMLInputElement> = React.createRef();
  passwordInput: RefObject<HTMLInputElement> = React.createRef();

  private handleValidateFields = () => {
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (!EMAIL_REGEXP.test(email)) {
      this.emailInput.current.style.borderColor = ERROR_COLOR;
    } else if (!password) {
      this.passwordInput.current.style.borderColor = ERROR_COLOR;
    } else {
      this.emailInput.current.style.borderColor = BASE_COLOR;
      this.passwordInput.current.style.borderColor = BASE_COLOR;
    }
  };

  private handleCheckDataLogin = (event) => {
    event.preventDefault();

    if (this.emailInput && this.passwordInput) {
      const email = this.emailInput.current.value;
      const password = this.passwordInput.current.value;

      if (email && password && EMAIL_REGEXP.test(email)) {
        this.props.onLogin({email, password});
      }
    }
  };

  render() {
    return (
      <div className="user-page">
        <Header pageTitle="Sign in" prefix="user-page" />
        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email" placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.emailInput}
                  onChange={this.handleValidateFields}
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-email"
                >
                  Email address
                </label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordInput}
                  onChange={this.handleValidateFields}
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-password"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                className="sign-in__btn"
                type="submit"
                onClick={this.handleCheckDataLogin}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
