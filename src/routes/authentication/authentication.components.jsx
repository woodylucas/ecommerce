import SignUpFrom from "../../components/sign-up-form/sign-up-form.component";
import SignInFrom from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInFrom />
      <SignUpFrom />
    </AuthenticationContainer>
  );
};

export default Authentication;
