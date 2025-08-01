export const animateText = (title: string) => {
  return (
    <span className="font-display text-4xl inline-block group cursor-default ">
      {title.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block group-hover:animate-jump"
          style={{
            animationDelay: `${i * 75}ms`,
            animationFillMode: "forwards",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
