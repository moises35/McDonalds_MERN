import Footer from "../components/Footer"
import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import SignUpForm from "../components/SignUpForm"

const LoginSignUp = ({comp}) => {
    const buttons = [
        {url: "/", text: "HOME"}
    ]

    return (
        <>
            <Header buttons={buttons} />
                {/* Si el comp es igual a "login" renderizar el componente login, sino si comp es igual a "signup" renderizar el componente SignUp */}
                {comp === "login" ? <LoginForm /> : comp === "signUp" ? <SignUpForm /> : null}
            <Footer />
        </>
    )
}

export default LoginSignUp