import "@/styles/globals.css";
import axios from "@/lib/axios";
import MainLayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";
import { useRouter } from "next/router";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { ThemeProvider } from "@/context/ThemeContext";

export async function getServerSideProps(context) {
  const token = context.req.cookies.laravel_session;
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get("/api/user");

    const { user } = useAuth();
    user.data = response.data;

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getLayout = () => {
    const loginRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/onboarding",
      "/password-reset",
      "/verify-email",
    ];

    if (loginRoutes.includes(router.pathname)) {
      return (
        <LoginLayout>
          <Component {...pageProps} />
        </LoginLayout>
      );
    }

    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    );
  };

  return (
    <ThemeProvider>
      <ClientThemeWrapper>{getLayout()} </ClientThemeWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
