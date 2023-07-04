"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { SSE } from "sse.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Components } from "react-markdown/lib/ast-to-react";
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
    const eventSource = new SSE(`/query/api?query=${query}`);

    function handleError<T>(err: T) {
      setIsLoading(false);
      setIsResponding(false);
      setHasError(true);
      console.error(err);
    }
    const id = v4();
    setMessages((prevMessages: Incoming[]) => [
      ...prevMessages,
      { id, role: "assistant", content: "" },
    ]);

    eventSource.addEventListener("error", handleError);
    eventSource.addEventListener("message", (e) => {
      try {
        setIsLoading(false);

        if (e.data === "[DONE]") {
          setIsResponding(false);
          return;
        }

        setIsResponding(true);

        const completionResponse: any = JSON.parse(e.data);
        const [
          {
            delta: { content },
          },
        ] = completionResponse.choices;

        setAnswer((answer) => {
          if (content !== undefined) {
            return (answer ?? "") + content;
          }
          return answer;
        });

        setMessages((prevMessages: Incoming[]) => {
          const index = prevMessages.findIndex((message) => message.id === id);
          const newMessages = [...prevMessages];
          if (content !== undefined) {
            newMessages[index] = {
              ...newMessages[index],
              content: newMessages[index].content + content,
            };
            return newMessages;
          }
          return prevMessages;
        });
      } catch (err) {
        handleError(err);
      }
    });

    eventSource.stream();

    setIsLoading(true);
  }, []);

  function handleResetPrompt() {
    setQuery("");
    setAnswer(undefined);
    setIsResponding(false);
    setHasError(false);
  }

  const renderers = {
    h1({ node, ...props }) {
      return <h1 className="font-extrabold" {...props} />;
    },
    p({ node, ...props }) {
      return (
        <p className="text-base chat-bubble chat-bubble-secondary" {...props} />
      );
    },
    img({ node, ...props }) {
      return (
        <Image
          src={props.src!}
          alt={props.alt!}
          title={props.title!}
          width={300}
          height={300}
          className="rounded-lg w-full h-auto"
        />
      );
    },
    ol({ node, ...props }) {
      return (
        <ol className="list-none" {...props}>
          <div className="space-y-8">{props.children}</div>
        </ol>
      );
    },
    li({ node, ...props }) {
      node.children &&
        node.children.map((child: any) => {
          console.log(child);
        });
      return (
        <li className="flex justify-end list-none" {...props}>
          {props.children}
        </li>
      );
    },
    a({ node, ...props }) {
      const link = node.properties?.href as string;
      return (
        <div className="py-5">
          <Link href={link} target="_blank">
            <label className="btn btn-primary w-full">Buy Now</label>
          </Link>
        </div>
      );
    },
  } as Components;

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`mx-auto flex flex-col rounded-lg pt-6 px-6 pb-2 w-full text-left border-scale-500 cursor-auto relative`}
      ref={chatRef}
    >
      {messages &&
        messages.map((message, index) => {
          return (
            <div key={index}>
              <div className="chat chat-start">
                {message.role === "user" && (
                  <div className="chat-bubble chat-bubble-primary text-sm text-scale-500 dark:text-scale-300">
                    {message.content}
                  </div>
                )}
              </div>
              {message.role === "assistant" && (
                <div className="chat chat-end p-24">
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
                    <ReactMarkdown
                      className="space-y-3"
                      remarkPlugins={[remarkGfm]}
                      components={renderers}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      <div className="sticky bottom-0 h-12 flex flex-row justify-center right-0 px-10 mb-10">
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
