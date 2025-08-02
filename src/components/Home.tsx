import { animateText } from "@utils/animateText";

type HomeProps = {
  username: string;
};

const Home = ({ username }: HomeProps) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Welcome{" "}
        <span className="font-display text-pink-600">
          {animateText(username)}
        </span>
      </h1>
      <p className="max-w-xl text-base sm:text-lg text-gray-700 mb-8">
        Let's get some crafting done today!
      </p>
    </section>
  );
};

export default Home;
