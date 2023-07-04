"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import favicon from "../static/favicon.png";
import { v4 } from "uuid";

type Product = {
  url: string;
  image: string;
  description: string;
};

type Incoming = {
  id: string;
  role: string;
  content: string;
};

export default function Chat(): React.ReactElement {
  const [query, setQuery] = useState<string>("");
  const [answer, setAnswer] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [messages, setMessages] = useState<Incoming[]>([]);

  const cantHelp =
    answer?.trim() === "Sorry, I don't know how to help with that yet.";
  const status = isLoading
    ? "Optimus Primark is searching..."
    : isResponding
    ? "Optimus Primark is responding"
    : cantHelp || hasError
    ? "Optimus Primark is has failed you"
    : undefined;

  const handleConfirm = useCallback(async (query: string) => {
    setMessages((prevMessages: Incoming[]) => [
      ...prevMessages,

      { id: v4(), role: "user", content: query },
    ]);

    let messages = (await fetch(`/functionCall/api?query=${query}`, {
      method: "POST",
    })) as any;

    messages = await messages.json();

    for (let message of messages) {
      console.log(message);
      if (message.role === "function") {
        setMessages((prevMessages: Incoming[]) => [
          ...prevMessages,
          { id: v4(), role: "function", content: message.content },
        ]);
      }
    }
  }, []);

  function handleError<T>(err: T) {
    setIsLoading(false);
    setIsResponding(false);
    setHasError(true);
    console.error(err);
  }
  const id = v4();

  function handleResetPrompt() {
    setQuery("");
    setAnswer(undefined);
    setIsResponding(false);
    setHasError(false);
  }

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`mx-auto min-h-screen flex flex-col rounded-lg p-4 md:pt-6 md:px-6 pb-10 w-full text-left border-scale-500 cursor-auto relative [overflow-anchor: none]`}
      ref={chatRef}
    >
      {messages &&
        messages.map((message: any, index: number) => {
          return (
            <div key={index}>
              <div className="chat chat-start pb-10">
                {message.role === "user" && (
                  <div className="chat-bubble chat-bubble-primary text-sm text-scale-500 dark:text-scale-300">
                    {message.content}
                  </div>
                )}
              </div>
              {message.role === "function" && (
                <div className="chat chat-end pb-20">
                  <div className="w-96 flex text-sm text-scale-500 dark:text-scale-300 justify-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image
                          src={favicon}
                          width={30}
                          height={30}
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-8">
                      {message.content.map((content: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="card w-96 bg-base-100 shadow-xl"
                          >
                            <figure>
                              <Image
                                src={content.image}
                                alt={content.title}
                                width={300}
                                height={300}
                              />
                            </figure>
                            <div className="card-body">
                              <h2 className="card-title">{content.title}</h2>
                              <p className="truncate">{content.description}</p>
                              <div className="card-actions justify-end">
                                <Link href={content.url} target="_blank">
                                  <button className="btn btn-primary">
                                    Buy Now
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      <div className="fixed h-12 w-full mb-10 px-10 flex flex-row  justify-center bottom-0 right-0 [overflow-anchor: auto]">
        {isLoading ||
          hasError ||
          (isResponding && (
            <div className="flex flex-row">
              <div>{status}</div>
              <div className="pl-4">
                <span className="loading loading-bars loading-md"></span>
              </div>
            </div>
          ))}
        <input
          className="w-full h-full input input-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I am Optimus Primark your personal shopping assistant here to help."
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
                e.preventDefault();
                handleConfirm(query);
                return;
              default:
                return;
            }
          }}
        ></input>
      </div>
    </div>
  );
}
