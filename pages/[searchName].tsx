import NavBar from "@/components/NavBar";
import Image from "next/image";
import { Fragment } from "react";
import { useState } from "react";
import { useDarkModeFont } from "@/context/dark-mode-font-context";

interface Phonetic {
  audio: string;
  text: string;
  licence: {
    name: string;
    url: string;
  };
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
}

interface WordData {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  sourceUrls: string[];
}
interface SearchNameProps {
  word: WordData | null;
}

export default function SearchName({ word }: SearchNameProps) {
  const { isDarkMode, selectedFont } = useDarkModeFont();
  const [audioPlaying, setAudioPlaying] = useState(false);

  //Handle audio play
  const handlePlay = () => {
    let audioUrl;
    if (word && word.phonetics) {
      word.phonetics.forEach((phonetic: Phonetic) => {
        if (phonetic.audio.length > 0) {
          audioUrl = phonetic.audio;
        }
      });
    }

    const audioElement = new Audio(audioUrl);

    audioElement.addEventListener("playing", () => setAudioPlaying(true));
    audioElement.addEventListener("ended", () => setAudioPlaying(false));

    audioElement.play();
  };

  return (
    <div
      className={`${
        isDarkMode ? "dark bg-midnight-black" : ""
      } ${selectedFont} px-6 py-6 min-h-screen`}
    >
      <div className="px-6 pb-10 shadow-3xl md:px-20 lg:w-4/6 lg:m-auto dark:shadow-4xl">
        <NavBar />
        {word ? (
          <div className="flex justify-between shrink-0 items-center">
            <div className="my-5">
              <p className="text-midnight-black font-bold text-2xl dark:text-white">
                {word.word}
              </p>
              {word.phonetics.length > 0 && (
                <span className="text-royal-purple ">
                  {word.phonetic || word.phonetics[1].text}
                </span>
              )}
            </div>

            <button
              className="bg-pale-purple rounded-full p-3.5"
              onClick={handlePlay}
            >
              {audioPlaying ? (
                <Image
                  src="./pause.svg"
                  alt="play button"
                  width="20"
                  height="20"
                />
              ) : (
                <Image
                  src="./play.svg"
                  alt="play button"
                  width="20"
                  height="20"
                />
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen px-5">
            <p className="text-royal-purple text-xl text-center ">
              This word doesn&apos;t exist, please try another word!!!!!
            </p>
          </div>
        )}

        {word &&
          word.meanings.map((meaning: Meaning, index) => (
            <ul key={index}>
              <p className="mb-3 mt-5 text-medium-gray">Meaning</p>
              <li className="flex items-center">
                <p className="mr-1.5 font-bold text-midnight-black text-base mb-3.5 dark:text-white">
                  {meaning.partOfSpeech}
                </p>
                <div className="border-t border-medium-gray flex-1"></div>
              </li>
              <li>
                <ul className="list-disc marker:text-royal-purple pl-5 text-sm dark:text-white">
                  {meaning.definitions.map((definition, index) => (
                    <Fragment key={index}>
                      <li className="mb-3.5">{definition.definition}</li>
                      {definition.example && (
                        <li className="text-medium-gray list-none mb-3.5">
                          &quot;{definition.example}&quot;
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>

                <ul className="flex text-sm flex-wrap">
                  {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <p className="mr-4 dark:text-medium-gray">Synonyms : </p>
                  )}
                  {meaning.synonyms &&
                    meaning.synonyms.map((synonym, index) => (
                      <li key={index} className="text-royal-purple mr-4">
                        {synonym}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          ))}
        <div className="flex flex-col">
          {word && <p className="text-medium-gray mt-5 mb-2">Source : </p>}
          {word &&
            word.sourceUrls.map((source, index) => (
              <a
                key={index}
                href={source}
                className="underline underline-offset-1 inline-block dark:text-white"
              >
                Click here
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { searchName } = context.query;
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchName}`
    );

    if (!response.ok) {
      return {
        props: {
          word: null,
        },
      };
    }

    const data = await response.json();

    return {
      props: {
        word: data[0],
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("An error occured: ", error.message);
    }

    return {
      props: {
        word: null,
      },
    };
  }
}
