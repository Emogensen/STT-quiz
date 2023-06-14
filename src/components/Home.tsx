import officeGif from "../assets/office-party.gif";
import bernieGif from "../assets/bernie.gif";
import danceGif from "../assets/dance.gif";
import sparklesGif from "../assets/sparkles.gif";
import { useEffect, useState } from "react";

function Home() {
  const gifArr = [officeGif, bernieGif, danceGif, sparklesGif];
  const [gifCount, setGifCount] = useState<number>(0);
  const [currentGif, setCurrentGif] = useState<string>(gifArr[gifCount]);

  useEffect(() => {
    setCurrentGif(gifArr[gifCount]);
  }, [gifCount]);

  const incrementGifCount = () => {
    if (gifCount === gifArr.length - 1) {
      setGifCount(0);
    } else {
      setGifCount(gifCount + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to the STT pre-party Quiz!
      </h2>
      <img
        className="mt-4"
        src={currentGif}
        alt="gif goes here"
        onClick={incrementGifCount}
      />
    </div>
  );
}

export default Home;
