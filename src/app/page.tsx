"use client";

import { loginAction } from "@actions/login";
import Login from "@components/Login";
import { animateText } from "@utils/animateText";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Welcome to{" "}
        <span className="font-display text-pink-600">
          {animateText("Knitcrolio")}
        </span>
      </h1>
      <p className="max-w-xl text-base sm:text-lg text-gray-700 mb-8">
        Your cozy companion for tracking yarn, knit, and crochet projects - all
        in one place!
      </p>
      <Login />

      <div className="inline-flex mt-4 text-sm gap-1">
        <p className="text-gray-500">Don't have an account? </p>
        <form action={loginAction}>
          <button
            type="submit"
            className="text-pink-600 hover:underline cursor-pointer font-medium"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;
